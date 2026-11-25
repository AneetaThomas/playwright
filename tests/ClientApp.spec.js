import {test,expect} from "@playwright/test";

// test("Clent App Login",async({page})=>{
//     await page.goto("https://www.saucedemo.com")
//     await page.locator("#user-name").fill("standard_user")
//     await page.locator("#password").fill("secret_sauce")
//     await page.locator("#login-button").click()
//     //To wait the browser
//     await page.waitForLoadState('networkidle')
//     await page.locator(".inventory_item_name").first().waitFor()
//     console.log(await page.locator(".inventory_item_name").allTextContents())


    
// })
test("@web Client App Login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    await page.waitForLoadState('networkidle')  //to make the network idle for sometime
    await page.locator(".inventory_item_name").first().waitFor() //wait for the first element to be visible
    console.log(await page.locator(".inventory_item_name").allTextContents()) //to get all the text contents of the elements
    const products = page.locator(".inventory_item_name")
    const productname = "Sauce Labs Backpack"
    const count = await products.count()
    for (let i =0; i<count; i++){
        if(await products.nth(i).textContent() === productname)
            await page.locator('.inventory_item').nth(i).locator("text=Add to Cart").click() //click on the button of the product
        break
    }
    await page.locator("#shopping_cart_container").click()
    
    await page.locator(".inventory_item_name").first().waitFor() //wait for the first element to be visible
    await expect(page.locator(".inventory_item_name").first()).toBeVisible()
     //assertion to check the product name in the cart
    await page.locator("#checkout").click()

    await page.locator("#first-name").fill("Sreemol")
    await page.locator("#last-name").fill("Janan")
    await page.locator("#postal-code").fill("680001")
    await page.locator("#continue").click()

    await page.locator(".inventory_item_name").waitFor()
    //await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99") //assertion to check the item total
    await expect(page.locator(".summary_subtotal_label")).toBeVisible()
    console.log(await page.locator(".summary_subtotal_label").textContent())
    //Check here
await expect(page.locator(".summary_subtotal_label")).toBeVisible() //assertion to check the item total
    console.log(await page.locator(".summary_subtotal_label").textContent())
await expect(page.locator(".summary_subtotal_label")).toBeVisible() //assertion to check the item total
    await page.locator("#finish").click()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!") //assertion to check the text after order completion
    

 //   await page.pause() //to manually check the page and then resume the test execution
})