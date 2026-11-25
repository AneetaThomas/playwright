import {test,expect} from "@playwright/test";
import { customtest } from "../Utils/testbaseTS";
import { POMmanager } from "../pages TS/POManager";
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import Cart from "../pages/Cart";
// import ShippingDetails from "../pages/ShippingDetails";
// import Summary from "../pages/Summary";


const testData=JSON.parse(JSON.stringify(require("../Utils/placeOrderTestdata.json")))
//stringify-to convert JSON data into string format
//parse-to access individual data from string
for(const data of testData){
test(`Automation of shopping cart Application using page object model for  ${data.productname}in typescript`,async({page})=>{
    // const uname="standard_user"
    // const pass="secret_sauce"
    // const productname="Sauce Labs Backpack"

    const pomanager=new POMmanager(page)
 //   const loginobj=new Login(page)
    const loginobj=pomanager.getLogin()
    await loginobj.goto()
//    await loginobj.validLogin(testData.uname,testData.pass)
   await loginobj.validLogin(data.uname,data.pass)
    
  //  const dashboard=new Dashboard(page)
    const dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(data.productname)
    await dashboard.moveToCart()

 //   const cart=new Cart(page)
    const cart=pomanager.getCart()
    await cart.verifyCart()
    await cart.checkOut()

 //   const shipping=new ShippingDetails(page)
    const shipping=pomanager.getShippingdetails()
    await shipping.enterDetails("Aneeta","Thomas","12233")
    await shipping.clickContinue()
    
 //   const summary=new Summary(page)
    const summary=pomanager.getSummary()
    await summary.verifySummary()
    await summary.clickFinish()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!") //assertion to check the text after order completion
 //   await page.pause()
})
}

customtest("customised Test case",async({page,testDataForOrder})=>{
   const pomanager=new POMmanager(page)
    const loginobj=pomanager.getLogin()
    await loginobj.goto()
    await loginobj.validLogin(testDataForOrder.uname,testDataForOrder.pass)
    
    const dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testDataForOrder.productname)
    await dashboard.moveToCart()

 
    const cart=pomanager.getCart()
    await cart.verifyCart()
    await cart.checkOut()
})