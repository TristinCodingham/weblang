const nearley = require('nearley');
const grammar = require('../grammar/grammar.js');
const fs = require('fs').promises;
const path = require('path');

// Nearly parser
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

async function main() {
    // Input - *.webl || inline 
    const filePath = process.argv[2];
    if(!filePath) {
        console.log("Provide a .webl filename.")
        return;
    }
    const code = (await fs.readFile(filePath)).toString();

    // Output path
    const output = path.join("trees", path.basename(filePath) + ".ast");

    // Parse input
    parser.feed(code);
    if(parser.results.length > 1) {
        console.warn("Parser generated multiple trees!");
        console.log(parser.results);
        return;
    } else if(parser.results.length < 1) {
        console.warn("Parser generated 0 trees!");
        return;
    } else {
        // Output
        const ast = parser.results[0];
        // Generate .ast file
        await fs.writeFile(output, JSON.stringify(ast, null, " "));
        console.log(`Parsed asset: ${filePath}`);
    }
}

main().catch(err => console.log(err.stack));