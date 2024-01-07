const core = require('@actions/core');
const fs = require('fs');

try {
    const path = core.getInput('json-path');
    const content = fs.readFileSync(path,{encoding:"utf8"})
    const jcontent = JSON.parse(content)
    console.log(content)
    if (jcontent.version === undefined){
        core.setFailed("version number not found");
    }
    core.setOutput("version", jcontent.version);
} catch (error) {
  core.setFailed(error.message);
}