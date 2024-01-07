const core = require('@actions/core');
const fs = require('fs');

try {
    const path = core.getInput('json-path');
    JSON.parse(fs.readFileSync(path)).version
    core.setOutput("version", version);
    if (version === undefined){
        core.setFailed("version number not found");
    }
} catch (error) {
  core.setFailed(error.message);
}