import test, { expect } from "@playwright/test";

test("Pop Up Validations",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()//error msg is hidden at first
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
//Alerts
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator("#alert-modal").click()
    await page.getByRole("link",{name:"Javascript Alert"}).click()
    page.on('dialog',async dialog=>{
        await page.waitForTimeout(3000)
        await dialog.accept()
        //await dialog.dismiss()-for cancellation of alert box
    })
    await page.locator(".btn.btn-warning").click()
    //frames
    await page.goto("https://demoqa.com/frames")
    const framePage=page.frameLocator("#frame1")
    console.log(await framePage.locator("#sampleHeading").textContent())
    await expect(framePage.locator("#sampleHeading")).toHaveText("This is a sample page")
    
  //  await page.pause()
})
test("Screenshot",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await page.locator(".error-message-container.error").screenshot({path:'./Screenshots/error.png'})
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.screenshot({path:'./Screenshots/error1.png'})
})
test("Visual Comparison",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    expect(await page.screenshot()).toMatchSnapshot('saucedemo.png')

})