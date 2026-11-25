import test, { expect } from "@playwright/test";

test("@api Get requestfetch users",async({request})=>{
    const response=await request.get("https://jsonplaceholder.typicode.com/users")
    expect(response.ok()).toBeTruthy()

    const body=await response.json()
    expect(body.length).toBeGreaterThan(0)
    console.log(body[0].name)
})
test("@api Post request - create user", async ({request})=>{
    const response = await request.post("https://jsonplaceholder.typicode.com/users", {
        data:
        {
             "name":"aneeta",
             "username":"aneeta123",
             "email":"aneeta@gmail.com" 
        }
     })
    expect(response.status()).toBe(201) 
     
    const responseBody = await response.json()
    console.log(responseBody.email)
    expect(responseBody.name).toBe("aneeta") 
})