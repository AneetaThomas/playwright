const { devices } = require("@playwright/test")

const config=(
  {
    testDir:'./tests',
    retries:1,
    workers:3,
    timeout:60*1000,//to wait for failure message to display
    expect:{
      timeout:30*1000, // to wait for assertion failures
    },
    reporter:'html',
    projects:[
      {
        name:'safari',
    use:{
      browserName:"webkit",
      headless:true,//browser will not be visible
      screenshot:'on',
      trace:'on',
      video:'on'

    }
  },
  {
    name:'chrome',
    use:{
      browserName:"chromium",
      headless:false,
      screenshot:'off',
      trace:'on',
      video:'on',
      //viewport:{width:720,height:720},
     // ...devices['iPhone 11'], //to run in mobile phones
      ignoreHttpsErrors:true, //SSL errors
      Permissions:['geolocation']
      
    }
  }
  ]
  }
)
module.exports=config



//to run -npx playwright test ClientApp.spec.js --config playwright.config1.js

//to run multiple browsers->npx playwright test ClientApp.spec.js --config playwright.config1.js --project=chrome
//project=safari/chrome

//npx playwright test --config playwright.config1.js --project=chrome