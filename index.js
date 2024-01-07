const core = require('@actions/core');
const fs = require('fs');

function recursivePath(path){
    if (fs.statSync(path).isDirectory()){
        return Object.fromEntries(fs.readdirSync(path).map(x => [x,recursivePath(x)]))
    }
    return path
}

try {
    const path = core.getInput('json-path');
    const content = fs.readFileSync(path,{encoding:"utf8"})
    const jcontent = JSON.parse(content)
    console.log(content)

    console.log(recursivePath("dist"))

    if (jcontent.version === undefined){
        core.setFailed("version number not found");
    }
    core.setOutput("version", jcontent.version);
} catch (error) {
  core.setFailed(error.message);
}