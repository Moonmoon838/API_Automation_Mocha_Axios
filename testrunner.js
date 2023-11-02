const shell = require('shelljs');

const addParams = process.argv;
let file='';
if (addParams[2] === 'file' && addParams[3]) {
    file += addParams[3];
}
shell.exec(`npx mocha --timeout=30000 ${file}  --reporter mochawesome --reporter-options reportDir=reports,reportFilename=report.html`)