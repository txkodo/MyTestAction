const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
    const path = core.getInput('json-path',{trimWhitespace:true}) ?? "package.json";
    const content = JSON.parse(fs.readFileSync(path,{encoding:"utf8"}))
    
    let [major, minor, patch] = content.version.split('.').map(parseInt);

    let release_type = core.getInput('release-type',{trimWhitespace:true})

    core.setOutput("current-version",`${major},${minor},${patch}`)

    switch (release_type){
        case "major":
            major += 1
            minor = 0
            patch = 0
            break;
        case "minor":
            minor += 1
            patch = 0
            break;
        case "patch":
        default:
            patch += 1
            break;
    }

    const next_version = `${major},${minor},${patch}`
    core.setOutput("next-version",next_version)

    const updateJsonFile = core.getInput('update-json',{trimWhitespace:true}).toLowerCase() === "true";

    if (updateJsonFile){
        content.version = next_version
        await fs.writeFile('package.json', JSON.stringify(content, undefined, 2), {
            encoding: 'utf8',
            });
    }
} catch (error) {
  core.setFailed(error.message);
}