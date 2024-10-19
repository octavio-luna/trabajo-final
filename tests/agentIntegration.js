
async function tests() {// list the files under the cypress/fixtures directory
    const testFolder = 'cypress/fixtures/';
    const fs = require('fs');
    const fileNames = fs.readdirSync(testFolder);
    
    console.log("tests: ", fileNames);

    for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        try {
            const filePath = testFolder + fileName;
            let fileContent = fs.readFileSync(filePath, 'utf8');
            console.log("fileContent: ", fileContent);
            console.log("-------------")
        } catch (err) {
            console.error("Error reading html file: ", err, "fileName: ", fileName);
        }

        try {
            fileContent = fs.readFileSync(fileName.replace('.html', '.js'), 'utf8');
            console.log("fileContent: ", fileContent);
        } catch (err) {
            console.error("Error reading js file: ", err, "fileName: ", fileName.replace('.html', '.js'));
        }
    }

}

tests();