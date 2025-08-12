const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('GitHub Pagesにアクセスしています...');
  
  try {
    // メインページにアクセス
    await page.goto('https://chom58.github.io/claude/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    const title = await page.title();
    console.log('ページタイトル:', title);
    
    // 404エラーかどうか確認
    const pageContent = await page.content();
    if (pageContent.includes('404') || pageContent.includes("There isn't a GitHub Pages site here")) {
      console.log('❌ 404エラー: GitHub Pagesがまだ有効になっていません');
    } else {
      console.log('✅ GitHub Pagesが有効です！');
      
      // プロジェクトページへのリンクを確認
      const projectLink = await page.$('a[href*="harajuku-creative-community"]');
      if (projectLink) {
        console.log('✅ Harajuku Creative Communityへのリンクが見つかりました');
        
        // プロジェクトページにアクセス
        await projectLink.click();
        await page.waitForLoadState('networkidle');
        
        const projectTitle = await page.title();
        console.log('プロジェクトページタイトル:', projectTitle);
      }
    }
    
    // スクリーンショットを撮影
    await page.screenshot({ path: 'github-pages-status.png' });
    console.log('スクリーンショットを保存しました: github-pages-status.png');
    
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
  }
  
  await browser.close();
})();