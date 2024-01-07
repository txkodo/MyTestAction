const core = require('@actions/core');
const fs = require('fs');

try {
    const path = core.getInput('json-path');
    const content = fs.readFileSync(path)
    const jcontent = JSON.parse(content)
    console.log(content)
    core.setOutput("version", jcontent.version);
    if (version === undefined){
        core.setFailed("version number not found");
    }
} catch (error) {
  core.setFailed(error.message);
}