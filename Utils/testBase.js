const base=require('@playwright/test')
exports.customtest=base.test.extend({
    testDataForOrder:{
        "uname":"standard_user",
        "pass":"secret_sauce",
        "productname":"Sauce Labs Backpack"
    }
})

