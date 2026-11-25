//create test case
const ExcelJS=require('exceljs')
import { test,expect } from '@playwright/test';

//from obsqura site download the excel file
//read file and edit the file
//upload to a site -https://the-internet.herokuapp.com/upload
//assert the value.
//page – Represents the browser tab.

const path = require('path');

test('Download, edit and upload Excel file', async ({ page }, testInfo) => {

    // STEP 1: Open Obsqura website
    await page.goto('https://selenium.qabible.in/index.php');

    // STEP 2: Navigate to Table Data Download
    await page.getByText('Table', { exact: true }).click();
    await page.getByText('Table Data Download', { exact: true }).click();

    // STEP 3: Download Excel file
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Excel' }).click();

    const download = await downloadPromise;

    // Get the downloaded filename
    const fileName = download.suggestedFilename();
    console.log('Downloaded file:', fileName);

    // Save the downloaded file
    const downloadPath = testInfo.outputPath(fileName);
    await download.saveAs(downloadPath);

    // STEP 4: Read the downloaded Excel file
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(downloadPath);

    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Read a cell value
    const originalValue = worksheet.getCell('A2').value;
    console.log('Original value:', originalValue);

    // STEP 5: Edit the Excel file
    worksheet.getCell('A2').value = 'Playwright Updated Value';

    // Save the modified Excel file
    const editedFilePath = testInfo.outputPath('EditedExcel.xlsx');

    await workbook.xlsx.writeFile(editedFilePath);

    // Verify the edited value
    expect(worksheet.getCell('A2').value)
        .toBe('Playwright Updated Value');

    console.log('Updated value:', worksheet.getCell('A2').value);

    // STEP 6: Open upload website
    await page.goto('https://the-internet.herokuapp.com/upload');

    // Upload the edited Excel file
    await page.locator('#file-upload').setInputFiles(editedFilePath);

    // Click Upload
    await page.locator('#file-submit').click();

    // STEP 7: Assert the uploaded file
    await expect(page.locator('#uploaded-files'))
        .toHaveText('EditedExcel.xlsx');

    console.log('Excel file uploaded successfully');

});
