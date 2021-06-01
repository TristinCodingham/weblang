const nearley = require('nearley');
const grammar = require('../grammar/grammar.js');
const fs = require('fs').promises;
const path = require('path');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

async function main() {
    const filePath = process.argv[2];
    if(!filePath) {
        console.log("Provide a .webl filename.")
        return;
    }
    const code = (await fs.readFile(filePath)).toString();
    const output = path.join("trees", path.basename(filePath) + ".ast");

    parser.feed(code);
    if(parser.results.length > 1) {
        console.warn("Parser generated multiple trees!");
        return;
    } else if(parser.results.length < 1) {
        console.warn("Parser generated 0 trees!");
        return;
    } else {
        const ast = parser.results[0];
        await fs.writeFile(output, JSON.stringify(ast, null, " "));
        console.log(`Parsed asset: ${output}`);
    }
}

main().catch(err => console.log(err.stack));