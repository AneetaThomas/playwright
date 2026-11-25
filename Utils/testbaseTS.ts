import {test as baseTest } from "@playwright/test"
interface TestDataForOrder{
    "uname":string,
    "pass":string,
    "productname":string
}
export const customtest=baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder:{
        "uname":"standard_user",
        "pass":"secret_sauce",
        "productname":"Sauce Labs Backpack"
    }
})

//testDataForOrder -is a fixture passed to line 3 and declared as testDataForOrder
