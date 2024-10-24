const OpenAI = require('openai');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function tests() {// list the files under the cypress/fixtures directory
    const testFolder = 'cypress/fixtures/';
    const fs = require('fs');
    const fileNames = fs.readdirSync(testFolder);
    
    console.log("tests: ", fileNames);

    for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        let htmlFile = '';
        try {
            const filePath = testFolder + fileName;
            htmlFile = fs.readFileSync(filePath, 'utf8');
            console.log("htmlFile: ", htmlFile);
            console.log("-------------")
        } catch (err) {
            console.error("Error reading html file: ", err, "fileName: ", fileName);
        }

        let jsFile = '';
        try {
            jsFile = fs.readFileSync(fileName.replace('.html', '.js'), 'utf8');
            console.log("jsFile: ", jsFile);
        } catch (err) {
            console.error("Error reading js file: ", err, "fileName: ", fileName.replace('.html', '.spec.js'));
        }
        
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Here\'s a cypress test that got broken. There also is the html output of the test that failed. If the test fail is due to some human error, propose a fix. You have to give me back the whole test, and only change the things that are related to the test issue' },
                { role: 'user', content: jsFile },
                { role: 'user', content: htmlFile }
            ]
        });
        console.log("response: ", response.data.choices[0].message)
    }

}

tests();