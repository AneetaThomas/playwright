import test from "@playwright/test";
import { expect } from "@playwright/test"

test("@web Using Special Locator",async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await page.getByPlaceholder('Username').fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole('button',{name:"Login"}).click()

    await page.waitForLoadState('networkidle')
    await page.getByText('Sauce Labs Backpack').waitFor()
    //don't know howw to locate using special locator
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
    await expect(page.locator(".inventory_item_name")).toBeVisible()

    // Click Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    //// Fill in customer details
    await page.getByRole('textbox', { name: 'First Name' }).fill('Aneeta');//getlabel/getbyplaceholder
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Thomas');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('680005');
    // Click Continue
    await page.getByRole('button', { name: 'Continue' }).click();
    // Verify the item total
    await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
    // Click Finish
    await page.getByRole('button', { name: 'Finish' }).click();
    // Verify order completion message
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();

 //   await page.pause()
})