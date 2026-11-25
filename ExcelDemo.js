const Exceljs=require('exceljs')
async function writeExcelFile(filePath,searchValue,chageValue){
    const workbook=new Exceljs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet=workbook.getWorksheet('Sheet1')
    const output1=await readExcelFile(worksheet,searchValue)
    const cell=worksheet.getCell(output1.row,output1.col+2)//eg:output1.col+2
    cell.value=chageValue//eg::"syndeny"
    await workbook.xlsx.writeFile(filePath)//to write permanently to the excel file
    console.log("excel file edited")
}
async function readExcelFile(worksheet,searchValue){
    let output={row:-1,col:-1}//if search object is not found then the value of row would be -1 and coloumn would be -1
    worksheet.eachRow((rows,rownumber)=>{ 
        rows.eachCell((cell,colnumber)=>{
      //      console.log(cell.value)
            if(cell.value===searchValue){
                output.row=rownumber
                output.col=colnumber
                console.log(output.row)
                console.log(output.col)
            }
        })
    })
    return output

}

writeExcelFile("C:/Users/aneet/Downloads/Obsqura Testing.xlsx","Bradley Greer","Tokiyo")

//in terminal -node ExcelDemo.js

