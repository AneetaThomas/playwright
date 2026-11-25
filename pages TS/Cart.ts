import { Locator, Page } from "@playwright/test"

const { expect } = require("@playwright/test")

export class Cart{
    page:Page
    item:Locator
    checkOutBtn:Locator
    constructor(page:Page){
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.checkOutBtn=page.locator("#checkout")
    }
    async verifyCart(){
        await this.item.waitFor() //wait for the first element to be visible
        await expect(this.item).toBeVisible()
    }
    async checkOut(){
        await this.checkOutBtn.click()

    }
}
//module.exports=Cart