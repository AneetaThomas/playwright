const config=(
  {
    testDir:'./tests',
    timeout:60*1000,//to wait for failure message to display
    expect:{
      timeout:30*1000, // to wait for assertion failures
    },
    reporter:'html',
    use:{
      browserName:"chromium",
      headless:false,
      screenshot:'on',
      trace:'on',
      video:'on'

    }
  }
)
module.exports=config