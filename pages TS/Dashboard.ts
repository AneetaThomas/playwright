import { Locator, Page } from "@playwright/test"

export class Dashboard{
    page:Page
    products:Locator
    item:Locator
    cart:Locator
    constructor(page:Page){
        this.page=page
        this.products=page.locator(".inventory_item_name")
        this.item=page.locator('.inventory_item')
        this.cart=page.locator("#shopping_cart_container")

    }
    async selectProduct(productname:string){
       await this.page.waitForLoadState('networkidle')  //to make the network idle for sometime
       await this.products.first().waitFor() //wait for the first element to be visible
        console.log(await this.products.allTextContents()) //to get all the text contents of the elements
    //    const products = page.locator(".inventory_item_name")
    //    const productname = "Sauce Labs Backpack"
        const count = await this.products.count()
        for (let i =0; i<count; i++){
            if(await this.products.nth(i).textContent() === productname){
                await this.item.nth(i).locator("text=Add to Cart").click() //click on the button of the product
            break
            }
        }
        }
    async moveToCart(){
        await this.cart.click()
    }
}
//module.exports=Dashboard