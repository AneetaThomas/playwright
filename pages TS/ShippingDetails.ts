import { Locator, Page } from "@playwright/test"

export class ShippingDetails{
    page:Page
    firstName:Locator
    lastName:Locator
    pinCode:Locator
    continueBtn:Locator

    constructor(page:Page){
        this.page=page
        this.firstName=page.locator("#first-name")
        this.lastName=page.locator("#last-name")
        this.pinCode=page.locator("#postal-code")
        this.continueBtn=page.locator("#continue")
    }
    async enterDetails(fname:string,lname:string,pin:string){
        await this.firstName.fill(fname)
        await this.lastName.fill(lname)
        await this.pinCode.fill(pin)
    }
    async clickContinue(){
        await this.continueBtn.click()
    }
}
//module.exports=ShippingDetails