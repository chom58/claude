const { chromium } = require('playwright');
const path = require('path');

async function testLanguageSwitch() {
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500 // Slow down for visibility
    });
    const page = await browser.newPage();
    
    // Load the local HTML file
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath);
    
    console.log('🔍 Testing Language Switch Functionality...\n');
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Test 1: Check default language (should be English)
    console.log('📋 Test 1: Checking default language (English)');
    
    // Check if English button is active
    const englishBtnClass = await page.getAttribute('.lang-btn[data-lang="en"]', 'class');
    console.log('English button active:', englishBtnClass.includes('active') ? '✅' : '❌');
    
    // Collect all visible text that might be in Japanese
    const japaneseTextElements = await page.evaluate(() => {
        const elements = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script and style elements
                    if (node.parentElement.tagName === 'SCRIPT' || 
                        node.parentElement.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Check if text contains Japanese characters
                    const text = node.textContent.trim();
                    if (text && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            const parent = node.parentElement;
            const text = node.textContent.trim();
            if (text) {
                elements.push({
                    text: text,
                    selector: parent.className || parent.tagName,
                    id: parent.id || '',
                    hasDataI18n: parent.hasAttribute('data-i18n') || 
                                parent.querySelector('[data-i18n]') !== null
                });
            }
        }
        
        return elements;
    });
    
    console.log('\n❌ Found Japanese text in English mode:');
    console.log('=====================================');
    
    for (const element of japaneseTextElements) {
        if (!element.hasDataI18n) {
            console.log(`  Text: "${element.text}"`);
            console.log(`  Location: ${element.selector} ${element.id ? '#' + element.id : ''}`);
            console.log(`  Has data-i18n: ${element.hasDataI18n ? 'Yes' : 'No ⚠️'}`);
            console.log('  ---');
        }
    }
    
    // Take screenshot of English version
    await page.screenshot({ path: 'language-test-english.png', fullPage: true });
    console.log('\n📸 Screenshot saved: language-test-english.png');
    
    // Test 2: Switch to Japanese
    console.log('\n📋 Test 2: Switching to Japanese');
    await page.click('.lang-btn[data-lang="ja"]');
    await page.waitForTimeout(1000);
    
    // Check if Japanese button is active
    const japaneseBtnClass = await page.getAttribute('.lang-btn[data-lang="ja"]', 'class');
    console.log('Japanese button active:', japaneseBtnClass.includes('active') ? '✅' : '❌');
    
    // Take screenshot of Japanese version
    await page.screenshot({ path: 'language-test-japanese.png', fullPage: true });
    console.log('📸 Screenshot saved: language-test-japanese.png');
    
    // Test 3: Check persistence
    console.log('\n📋 Test 3: Testing persistence');
    await page.reload();
    await page.waitForTimeout(2000);
    
    const japaneseStillActive = await page.getAttribute('.lang-btn[data-lang="ja"]', 'class');
    console.log('Japanese still active after reload:', japaneseStillActive.includes('active') ? '✅' : '❌');
    
    // Test 4: Find elements without data-i18n attributes
    console.log('\n📋 Test 4: Finding elements without data-i18n attributes');
    
    const untranslatedElements = await page.evaluate(() => {
        const results = [];
        
        // Check all elements with text content
        const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, td, th, div');
        
        allElements.forEach(element => {
            // Skip if element or its children have data-i18n
            if (element.hasAttribute('data-i18n') || 
                element.hasAttribute('data-i18n-list') ||
                element.hasAttribute('data-i18n-placeholder')) {
                return;
            }
            
            // Get direct text content (not from children)
            const directText = Array.from(element.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join(' ')
                .trim();
            
            // Check if contains Japanese characters
            if (directText && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(directText)) {
                results.push({
                    tagName: element.tagName,
                    className: element.className,
                    id: element.id,
                    text: directText.substring(0, 50) + (directText.length > 50 ? '...' : ''),
                    fullText: directText
                });
            }
        });
        
        return results;
    });
    
    if (untranslatedElements.length > 0) {
        console.log('\n⚠️  Elements with Japanese text but no data-i18n:');
        console.log('================================================');
        untranslatedElements.forEach((el, index) => {
            console.log(`${index + 1}. ${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ').join('.') : ''}`);
            console.log(`   Text: "${el.text}"`);
        });
    } else {
        console.log('✅ All Japanese text has data-i18n attributes');
    }
    
    console.log('\n✨ Test completed!');
    
    await browser.close();
}

// Run the test
testLanguageSwitch().catch(console.error);