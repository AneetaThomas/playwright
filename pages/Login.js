

class Login{
    constructor(page){//constructor -for memory allocation
        this.page=page //instance variables,instance=object
        this.userName=page.locator("#user-name")
        this.password=page.locator("#password")
        this.loginBtn=page.locator("#login-button")
    
    }
    async goto(){
        await this.page.goto("https://www.saucedemo.com/")
    }
    async validLogin(uname,pass){
        await this.userName.fill(uname)
        await this.password.fill(pass)
        await this.loginBtn.click()
    }

}
module.exports=Login