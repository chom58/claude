const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('GitHub Pagesの最終確認...\n');
  
  const urls = [
    'https://chom58.github.io/claude/',
    'https://chom58.github.io/claude/Claude/docs/',
    'https://chom58.github.io/claude/Claude/projects/experiments/harajuku-creative-community/public/',
    'https://chom58.github.io/claude/Claude/projects/experiments/harajuku-creative-community/docs/'
  ];
  
  for (const url of urls) {
    console.log(`\nアクセス中: ${url}`);
    try {
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      const status = response.status();
      const title = await page.title();
      
      if (status === 200) {
        console.log(`✅ ステータス: ${status}`);
        console.log(`   タイトル: ${title}`);
      } else {
        console.log(`❌ ステータス: ${status}`);
      }
    } catch (error) {
      console.log(`❌ エラー: ${error.message}`);
    }
  }
  
  // 最後のURLでスクリーンショット
  await page.screenshot({ path: 'harajuku-creative-community-live.png' });
  console.log('\nスクリーンショットを保存しました: harajuku-creative-community-live.png');
  
  await browser.close();
})();