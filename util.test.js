const { generateText, checkAndGenerate } = require("./util")
const puppeteer = require("puppeteer")

// UNIT TESTING
test("should output name and age", () => {
    const text = generateText("Max", 29)
    expect(text).toBe('Max (29 years old)');
})

test("should provide dynamic value", () => {
    const text = generateText("", 0)
    expect(text).toBe(' (0 years old)');
})


// INTEGRATION TEST
test( "should check and generate functionality", () => {
    const text = checkAndGenerate('Max', 29)
    expect(text).toBe('Max (29 years old)');

} )


// E2E TESTING

test("should click around around", async () => {
    const browser = await puppeteer.launch({
        headless : false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    })

    const page = await (await browser).newPage()
    await (await page).goto('file:///D:/MSendServer/jstesting/index.html')
    await page.click('input#name');
    await page.type('input#name','Anna');
    await page.click('input#age');
    await page.type('input#age','28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent)
    expect(finalText).toBe('Anna (28 years old)')

}, 30000)