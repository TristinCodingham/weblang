const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    if(!process.argv[2]) throw Error("Provide a .webl file or inline webl")
    
    // Input - *.webl || inline
    const input = process.argv[2];
    if(path.extname(input) === ".webl") parseFile(input);
    else parseInline(input);
}

async function parseFile(input) {
    const weblFilename = path.normalize(input);
    const astFilename = path.join("trees", path.basename(weblFilename.concat(".ast")));
    const jsFilename = path.join("public", "static", path.basename(weblFilename.concat(".js")));
    await execute(`node parser/parse.js ${weblFilename}`); // Generate .ast
    await execute(`node generator/generate.js ${astFilename}`); // Generate .js
    await execute(`node ${jsFilename}`); // Run .js
}

async function execute(command) {
    const output = await exec(command);
    if(output.stdout)
        console.log(output.stdout);
    else if(output.stderr)
        console.error(output.stderr)
}

main().catch(err => console.error(err.stack));