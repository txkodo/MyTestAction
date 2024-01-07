const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

function recursivePath(p){
    if (fs.statSync(p).isDirectory()){
        return Object.fromEntries(fs.readdirSync(p).map(x => [x,recursivePath(path.join(p,x))]))
    }
    return null
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