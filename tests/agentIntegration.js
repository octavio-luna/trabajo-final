const OpenAI = require('openai');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function tests() {// list the files under the cypress/fixtures directory
    try {
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
                    { role: 'system', content: 'Here\'s a cypress test that got broken. There also is the html output of the test that failed. If the test fail is due to some human error, propose a fix. You have to give me back the whole test, and only change the things that are related to the test issue. Dont add any additional text since the output will go straight into a file to fix the test' },
                    { role: 'user', content: jsFile },
                    { role: 'user', content: htmlFile }
                ]
            });
            console.log("response: ", response.choices[0].message.content)    
            //check if contains ```javascript or ``` and remove it
            if (response.includes('```javascript')) {
                response = response.replace('```javascript', '');
            }
            if (response.includes('```')) {
                response = response.replace('```', '');
            }
            fs.writeFileSync(fileName.replace('.html', '.spec.js'), response)//.choices[0].message.content);
        }
    } catch(e) {
        console.error("Error reading fixtures directory: ", e);
        throw e;
    }

    await createPullRequest();
}

async function createPullRequest() {
    //get current git branch
    const { execSync } = require('child_process');
    try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim() + '-fix';

        // Create a new branch
        console.log(`Creating a new branch: ${currentBranch}`);
        execSync(`git checkout -b ${currentBranch}`);
        
        // Add all files to git
        console.log('Adding files to git...');
        execSync('git add .');
        
        // Commit the changes
        console.log('Committing changes...');
        execSync('git commit -m "fix broken tests"');
        
        // Add GitHub to known hosts
        console.log('Adding GitHub to known hosts...');
        execSync('ssh-keyscan github.com >> ~/.ssh/known_hosts', { stdio: 'inherit' });

        // Push the changes to the new branch
        console.log(`Pushing changes to the new branch: ${currentBranch}`);
        execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });

        console.log('Changes pushed successfully.');
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

tests();