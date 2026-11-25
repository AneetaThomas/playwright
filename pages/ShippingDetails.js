class ShippingDetails{
    constructor(page){
        this.page=page
        this.firstName=page.locator("#first-name")
        this.lastName=page.locator("#last-name")
        this.pinCode=page.locator("#postal-code")
        this.continueBtn=page.locator("#continue")
    }
    async enterDetails(fname,lname,pin){
        await this.firstName.fill(fname)
        await this.lastName.fill(lname)
        await this.pinCode.fill(pin)
    }
    async clickContinue(){
        await this.continueBtn.click()
    }
}
module.exports=ShippingDetails