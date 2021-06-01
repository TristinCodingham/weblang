const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const weblFilename = path.normalize(process.argv[2]);
    if(!weblFilename) {
        console.warn("Provide a .webl file");
        return;
    }
    const astFilename = path.join("trees", path.basename(weblFilename.concat(".ast")));
    const jsFilename = path.join("public", "assets", path.basename(weblFilename.concat(".js")));
    await execute(`node parser/parse.js ${weblFilename}`);
    await execute(`node generator/generate.js ${astFilename}`);
    await execute(`node ${jsFilename}`);
}

async function execute(command) {
    const output = await exec(command);
    if(output.stdout)
        console.log(output.stdout);
    else if(output.stderr)
        console.error(output.stderr)
}

main().catch(err => console.error(err.stack));