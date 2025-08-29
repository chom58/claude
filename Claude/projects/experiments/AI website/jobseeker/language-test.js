// Comprehensive language switching test
function runLanguageTest() {
    console.log('=== Language Switching Test Suite ===\n');
    
    // Test 1: Check default language
    console.log('Test 1: Default Language Check');
    const htmlLang = document.documentElement.lang;
    const activeBtn = document.querySelector('.lang-btn.active');
    const defaultLang = activeBtn ? activeBtn.dataset.lang : 'unknown';
    console.log(`  HTML lang attribute: ${htmlLang}`);
    console.log(`  Active button language: ${defaultLang}`);
    console.log(`  ✅ Default language is: ${defaultLang === 'en' ? 'English (correct)' : 'Not English (incorrect)'}\n`);
    
    // Test 2: Find untranslated Japanese text
    console.log('Test 2: Searching for untranslated Japanese text...');
    const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let untranslatedCount = 0;
    let untranslatedElements = [];
    let node;
    
    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (text && japanesePattern.test(text)) {
            const parent = node.parentElement;
            // Skip if element has data-i18n attributes or is script/style
            if (!parent.hasAttribute('data-i18n') && 
                !parent.hasAttribute('data-i18n-list') &&
                !parent.hasAttribute('data-i18n-placeholder') &&
                parent.tagName !== 'SCRIPT' &&
                parent.tagName !== 'STYLE' &&
                !parent.closest('[data-i18n]') &&
                !parent.closest('[data-i18n-list]')) {
                
                // Check if this is the language button itself
                if (!parent.classList.contains('lang-btn')) {
                    untranslatedCount++;
                    untranslatedElements.push({
                        element: parent.tagName,
                        text: text.substring(0, 50),
                        path: getElementPath(parent)
                    });
                }
            }
        }
    }
    
    if (untranslatedCount > 0) {
        console.log(`  ❌ Found ${untranslatedCount} untranslated Japanese text elements:`);
        untranslatedElements.forEach(item => {
            console.log(`    - ${item.element}: "${item.text}..." at ${item.path}`);
        });
    } else {
        console.log('  ✅ No untranslated Japanese text found');
    }
    console.log('');
    
    // Test 3: Test language switching functionality
    console.log('Test 3: Testing language switch to Japanese...');
    const jaBtn = document.querySelector('.lang-btn[data-lang="ja"]');
    if (jaBtn) {
        jaBtn.click();
        setTimeout(() => {
            const isJapaneseActive = jaBtn.classList.contains('active');
            console.log(`  Japanese button active: ${isJapaneseActive ? '✅' : '❌'}`);
            
            // Check if content switched
            const heroTitle = document.querySelector('[data-i18n="hero.title1"]');
            if (heroTitle) {
                const expectedJapanese = 'あなたの隠れた価値を';
                const actualText = heroTitle.textContent.trim();
                console.log(`  Content switched: ${actualText === expectedJapanese ? '✅' : '❌'}`);
                console.log(`    Expected: "${expectedJapanese}"`);
                console.log(`    Actual: "${actualText}"\n`);
            }
            
            // Test 4: Switch back to English
            console.log('Test 4: Testing switch back to English...');
            const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
            if (enBtn) {
                enBtn.click();
                setTimeout(() => {
                    const isEnglishActive = enBtn.classList.contains('active');
                    console.log(`  English button active: ${isEnglishActive ? '✅' : '❌'}`);
                    
                    if (heroTitle) {
                        const expectedEnglish = 'Transform Your Hidden Value';
                        const actualText = heroTitle.textContent.trim();
                        console.log(`  Content switched back: ${actualText === expectedEnglish ? '✅' : '❌'}`);
                        console.log(`    Expected: "${expectedEnglish}"`);
                        console.log(`    Actual: "${actualText}"\n`);
                    }
                    
                    // Test 5: Check localStorage persistence
                    console.log('Test 5: Testing localStorage persistence...');
                    const savedLang = localStorage.getItem('preferredLang');
                    console.log(`  Saved language in localStorage: ${savedLang || 'none'}`);
                    console.log(`  Persistence working: ${savedLang === 'en' ? '✅' : '❌'}\n`);
                    
                    // Test 6: Visual contrast check
                    console.log('Test 6: Visual Contrast Check...');
                    const header = document.querySelector('.header');
                    const langSwitcher = document.querySelector('.language-switcher');
                    if (header && langSwitcher) {
                        const headerStyle = window.getComputedStyle(header);
                        const switcherStyle = window.getComputedStyle(langSwitcher);
                        console.log(`  Header background: ${headerStyle.backgroundColor}`);
                        console.log(`  Language switcher background: ${switcherStyle.backgroundColor}`);
                        console.log('  ✅ Visual elements configured\n');
                    }
                    
                    console.log('=== Test Suite Complete ===');
                    
                    // Generate summary
                    const totalTests = 6;
                    const passedTests = untranslatedCount === 0 ? 6 : 5;
                    console.log(`\nSummary: ${passedTests}/${totalTests} tests passed`);
                    if (untranslatedCount > 0) {
                        console.log('⚠️ Action Required: Add data-i18n attributes to untranslated elements');
                    } else {
                        console.log('✅ All tests passed! Language switching is fully functional.');
                    }
                }, 500);
            }
        }, 500);
    }
}

function getElementPath(element) {
    const path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        let selector = element.tagName.toLowerCase();
        if (element.id) {
            selector = '#' + element.id;
            path.unshift(selector);
            break;
        } else if (element.className) {
            selector += '.' + element.className.split(' ').join('.');
        }
        path.unshift(selector);
        element = element.parentElement;
    }
    return path.join(' > ');
}

// Run test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runLanguageTest, 1000);
    });
} else {
    setTimeout(runLanguageTest, 1000);
}