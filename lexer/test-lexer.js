const lexer = require('./lexer');
const fs = require('fs').promises;

async function main() {
    let token;
    const code = (await fs.readFile("tests/basic.webl")).toString();
    lexer.reset(code);
    while(true) {
        token = lexer.next();
        if(!token) {
            console.warn("No more input");
            break;
        } else {
            console.log(token)
        }
    }
}

main().catch(err => console.log(err.stack));
