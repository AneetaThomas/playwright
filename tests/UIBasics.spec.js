import test, { expect } from "@playwright/test";
test.describe.configure({mode:'parallel'})
//if test cases are interconnected then one test has execute 
// only after the other is executed in such cases we use mode:serial

//older method
test("First PLaywright Test",async function(){
//empty test case
})
//Newer Method
//we can write more than one test case in a single file
test("Browser context playwright test",async({browser})=>{  //fixtures-browser
    const context=await browser.newContext()
    const page=await context.newPage()       //browser context
    await page.goto("https://google.com")    //used in multiple windows,tabs,
    console.log(await page.title())          //cookies scenarios

    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standarduser") //id ->#,classname->.
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    console.log(await page.locator(".error-message-container.error").textContent())
    //Assertions
    await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface:")
    //defining  locators as variables
    const username=page.locator("#user-name")
    const login=page.locator("#login-button")   
    const title=page.locator(".inventory_item_name")
    
    await username.fill("")
    await username.fill("standard_user")
    await login.click()
    //to print multiple elements having the same locator
    console.log(await title.first().textContent())
    console.log(await title.nth(1).textContent()) 
    console.log(await title.allTextContents())
    await page.pause()
})

test("Page PlayWright test",async({page})=>{
    await page.goto("https://google.com")      //page context
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
    //Assertion=conditional check
})

test("UI controls",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-item").nth(1).click()
    await page.locator(".list-group-item").nth(1).click()
    await page.locator("#gridCheck").check()
    await expect(page.locator("#gridCheck")).toBeChecked()
    expect(await page.locator('#gridCheck').isChecked()).toBeTruthy()

    await page.locator(".list-group-item").nth(2).click()
    await page.locator("#inlineRadio1").click()
    await expect(page.locator("#inlineRadio1")).toBeChecked()
    await page.locator("#inlineRadio24").click()
    expect(await page.locator("#inlineRadio24").isChecked()).toBeTruthy()
    await page.locator("#button-two").click()
    await page.locator("//a[normalize-space()='Select Input']").click()
   // await page.locator("//li[@class='list-group-item]/a[text()='Select Input']").click()
    await page.locator("#single-input-field").selectOption("Red")
    await expect(page.locator('#single-input-field')).toHaveValue("Red")

    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Aneeta")
    await page.locator("#validationCustom02").fill("Thomas")
    await page.locator("#validationCustomUsername").fill("Aneeta001")
    await page.locator("#validationCustom03").fill("Alapy")
    await page.locator("#validationCustom04").fill("Kerala")
    await page.locator("#validationCustom05").fill("12345")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click()
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    
    await page.locator(".list-group-item").nth(0).click()
    await page.locator("#single-input-field").fill("Hello World")
    await page.locator("#button-one").click()
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello World")
    
    
    await page.pause()
    
})
test("Child Window and New Tab",async({browser})=>{
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto("https://www.google.com")
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
        page.evaluate(()=>window.open("https://www.saucedemo.com"))
    ])
    const newtab=await context.newPage()
    await newtab.goto("https://github.com/")
    console.log("chid window and new tab opened successfully")
    const newtab1=await context.newPage()
    await newtab1.goto("https://selenium.qabible.in/index.php")

    
    await page.pause()
})
//code using code gen
test("Special locators",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")// special locator-getBYRole
    //hyperlink
    await page.getByRole("link",{name:"Input Form"}).click()//for link and button getBy ...is used
    await page.getByRole("link",{name:"Checkbox Demo"}).click()
    //getByLabel used for check box and radio buttons
    await page.getByLabel("Click on this check box").check()
    await page.getByRole("link",{name:"Radio Buttons Demo"}).click()
  //  await page.getByRole("radio",{name:"45 to 60"}).check()
 //   await page.pause()
    await page.getByLabel("45 to 60").check()
    
    await page.getByRole("link",{name:"Select Input"}).click()
    await page.getByLabel("Select Color").selectOption("Red")//dropdown
    await page.getByRole("link",{name:"Form Submit",exact:true}).click()
    await page.getByPlaceholder("First name").fill("Abcd")
    await page.getByPlaceholder("Last name").fill("adnjn")
    await page.getByPlaceholder("Username").fill("admin01")
    await page.getByPlaceholder("City").fill("jnj")
    await page.getByPlaceholder("State").fill("njnf")
    await page.getByPlaceholder("zip").fill("654648")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name:"Submit form"}).click()
    //Asserttion
    await expect(page.getByText("Form has been submitted successfully!")).toBeVisible()
    await page.getByRole("link",{name:"Simple Form Demo"}).click()
    await page.getByPlaceholder("Message").fill("HelloWorld")
    await page.getByRole("button",{name:"Show Message"}).click()
    await expect(page.getByText("Your Message : HelloWorld")).toBeVisible()

    await page.pause()




})