const fs = require('fs').promises;
const path = require('path');

async function main() {
    const filename = process.argv[2];
    const outputPath = path.join("public", "assets", path.basename(filename.replace("ast", "js")));
    if(!filename) {
        console.warn("Provide a .ast filename");
        return;
    }
    
    const astJson = (await fs.readFile(path.normalize(filename))).toString();
    const inputs = JSON.parse(astJson);
    const jsCode = generator(inputs);
    await fs.writeFile(outputPath, jsCode);
    console.log(`Generated asset: ${outputPath}`);
}

function generator(inputs) {
    const lines = [];
    console.log(inputs)
    return lines.join("\n");
}

function generateJs(node) {
    let js;
    switch (node.type) {
        case "statements":
            js = handleStatements(node);
            break;
        case "expressions":
            js = handleExpressions(node);
            break;
        default: new Error(`Unhandled AST node: ${node.type}`);
            break;
    }
    return js;
}

function handleStatements(statement) {
    
}

function handleExpressions(expression) {

}

main().catch(err => console.log(err.stack));