// Simple script to check for untranslated Japanese text
const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Regular expression to find Japanese characters
const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;

// Parse HTML to find text content
const parser = new DOMParser();
const doc = parser.parseFromString(htmlContent, 'text/html');

console.log('🔍 Checking for untranslated Japanese text in index.html\n');
console.log('=' .repeat(60));

// Split HTML into lines for analysis
const lines = htmlContent.split('\n');
const untranslatedSections = [];

lines.forEach((line, index) => {
    // Skip script and style tags
    if (line.includes('<script') || line.includes('<style') || line.includes('</script') || line.includes('</style')) {
        return;
    }
    
    // Check if line contains Japanese text
    const japaneseMatches = line.match(japaneseRegex);
    
    if (japaneseMatches) {
        // Check if line has data-i18n attribute
        const hasDataI18n = line.includes('data-i18n');
        
        // Only report if it doesn't have data-i18n and is not a comment
        if (!hasDataI18n && !line.trim().startsWith('<!--')) {
            untranslatedSections.push({
                lineNumber: index + 1,
                text: line.trim(),
                japaneseText: japaneseMatches.join(', ')
            });
        }
    }
});

if (untranslatedSections.length > 0) {
    console.log('❌ Found untranslated Japanese text:\n');
    untranslatedSections.forEach(section => {
        console.log(`Line ${section.lineNumber}:`);
        console.log(`  Japanese: "${section.japaneseText}"`);
        console.log(`  Full line: ${section.text.substring(0, 80)}${section.text.length > 80 ? '...' : ''}`);
        console.log('');
    });
    
    console.log(`\nTotal: ${untranslatedSections.length} sections need translation attributes`);
} else {
    console.log('✅ All Japanese text has translation attributes!');
}

console.log('\n' + '=' .repeat(60));