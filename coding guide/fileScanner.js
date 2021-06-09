// Importing the Required Modules
const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('files/test.js'),
    output: process.stdout,
    terminal: false
});


let i = 1;
file.on('line', (line) => {
    line = line.trim();

    // Check if the statement end with semi colon
    if (!line.endsWith(';')) {
        console.log(`missing ';' in line ${i}`);
    }


    let lineChunks = line;
    let n = lineChunks.length;
    let index = line.indexOf("=");

    let before = lineChunks[index - 1];
    let after = lineChunks[index + 1];
    if (before != undefined && after != undefined) {
        if (before.trim() != "") {
            console.log(`missing space before '=' in line ${i}`);
        }
        if (after.trim() != "") {
            console.log(`missing space after '=' in line ${i}`);
        }
    }

    i++;
});