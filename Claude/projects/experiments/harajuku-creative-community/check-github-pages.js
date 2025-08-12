const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('GitHub Pagesにアクセスしています...');
  await page.goto('https://chom58.github.io/claude/Claude/projects/experiments/harajuku-creative-community/docs/', {
    waitUntil: 'networkidle'
  });
  
  // ページタイトルを確認
  const title = await page.title();
  console.log('ページタイトル:', title);
  
  // WHO WE CONNECTセクションまでスクロール
  await page.evaluate(() => {
    document.querySelector('#whoweconnect').scrollIntoView({ behavior: 'smooth' });
  });
  
  await page.waitForTimeout(2000);
  
  // SVGアイコンの存在を確認
  const svgIcons = await page.$$eval('.creator-icon svg', svgs => svgs.length);
  console.log('SVGアイコンの数:', svgIcons);
  
  // 絵文字の存在を確認（もし残っていれば）
  const hasEmoji = await page.evaluate(() => {
    const icons = document.querySelectorAll('.creator-icon');
    for (const icon of icons) {
      const text = icon.textContent.trim();
      // 絵文字の文字コード範囲をチェック
      if (/[\u{1F300}-\u{1F9FF}]/u.test(text)) {
        return true;
      }
    }
    return false;
  });
  
  console.log('絵文字が残っているか:', hasEmoji);
  
  // スクリーンショットを撮影
  await page.screenshot({ 
    path: 'github-pages-check.png',
    fullPage: false 
  });
  console.log('スクリーンショットを保存しました: github-pages-check.png');
  
  // ページのソースコードの一部を確認
  const creatorIconHTML = await page.evaluate(() => {
    const firstIcon = document.querySelector('.creator-icon');
    return firstIcon ? firstIcon.innerHTML.substring(0, 200) : 'アイコンが見つかりません';
  });
  console.log('最初のアイコンのHTML:', creatorIconHTML);
  
  await browser.close();
})();