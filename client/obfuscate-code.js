const fs = require('fs')

const path = 'dist/client'
const fileType = 'js'
const dir = fs.opendirSync(path)
let dirent

while ((dirent = dir.readSync()) !== null) {
    const fileName = dirent.name
    const extention = fileName.slice(fileName.lastIndexOf('.') + 1)

    // Require Filesystem module
    const fs = require('fs');

    // Require the Obfuscator Module
    const JavaScriptObfuscator = require('javascript-obfuscator');

    if (extention === fileType) {
        //add code to obfuscate code \


        // Read the file of your original JavaScript Code as text
        fs.readFile(path + '/' + fileName, "UTF-8", function(err, data) {
            if (err) {
                throw err;
            }

        // Obfuscate content of the JS file
        const obfuscationResult = JavaScriptObfuscator.obfuscate(data);

        // Write the obfuscated code into a new file
        fs.writeFile(path + '/' + fileName, obfuscationResult.getObfuscatedCode() , function(err) {
            if(err) {
                return console.log(err);
            }

            console.log('The file ' + fileName + ' was obfuscated!');
        });
    });
    }
}
dir.closeSync()
