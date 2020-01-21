const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util'); // This syntax of import only supported by Jest

test('should output name and age', () => {
    const text = generateText('Max', 29);

    expect(text).toBe('Max (29 years old)');
});

test('should output data-less text', () => {
    const text = generateText();

    expect(text).toBe('undefined (undefined years old)');
});

test('should output name and age', () => {
    const text = checkAndGenerate('Max', 29);

    expect(text).toBe('Max (29 years old)');
});

test('should click around', async () => {
    const browser = await puppeteer.launch({          // It will return a Promise.
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080'],
    });
    const page = await browser.newPage();
    await page.goto('file:///F:/Work_code/Testing/academind/js-testing-introduction/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '45');
    await page.click('button#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (45 years old)');
});
