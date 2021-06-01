// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const lexer = require('../lexer/lexer');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "inputs", "symbols": ["inputs", "input"], "postprocess": 
        (data) => [...data[0], data[1]]
            },
    {"name": "inputs", "symbols": ["input"], "postprocess": 
        (data) => [data[0]]
            },
    {"name": "input", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: "statements",
                data: data[0]
            }
        }
            },
    {"name": "input", "symbols": ["expressions"], "postprocess": 
        (data) => {
            return {
                type: "expressions",
                data: data[0]
            }
        }
            },
    {"name": "statements", "symbols": ["_", "statements", (lexer.has("newline") ? {type: "newline"} : newline), "statement"], "postprocess": 
        (data) => [...data[1], data[3]]
            },
    {"name": "statements", "symbols": ["_", "statement"], "postprocess": 
        (data) => [data[1]]
            },
    {"name": "expressions", "symbols": ["_", "expressions", (lexer.has("newline") ? {type: "newline"} : newline), "expression"], "postprocess": 
        (data) => [...data[1], data[3]]
            },
    {"name": "expressions", "symbols": ["_", "expression"], "postprocess": 
        (data) => [data[1]]
            },
    {"name": "statement", "symbols": ["assignment_literal"], "postprocess": 
        (data) => {
            return {
                type: "assignment_literal",
                data: data[0]
            }
        }
            },
    {"name": "expression", "symbols": ["arithmetic_expression"]},
    {"name": "assignment_literal", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword), "__", "identifiers", "_", {"literal":"="}, "_", "literal"], "postprocess": 
        (data) => {
            return {
                type: data[0],
                data: {
                    identifier_list: [...data[2]],
                    literal: data[6]
                }
            }
        }
            },
    {"name": "identifiers", "symbols": ["identifiers", "_", {"literal":","}, "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => [...data[0], data[4]]
            },
    {"name": "identifiers", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => [data[0]]
            },
    {"name": "literal", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "literal", "symbols": ["function_call"], "postprocess": id},
    {"name": "literal", "symbols": ["function_literal"], "postprocess": id},
    {"name": "literal", "symbols": ["array_literal"], "postprocess": id},
    {"name": "literal", "symbols": ["object_literal"], "postprocess": id},
    {"name": "literal", "symbols": ["arithmetic_expression"], "postprocess": id},
    {"name": "literal", "symbols": []},
    {"name": "function_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "params", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "function_call",
                data: {
                    identifier: data[0],
                    params: data[4]
                }
            }
        }
            },
    {"name": "function_literal", "symbols": [{"literal":"("}, "_", "params", "_", {"literal":")"}, "_", {"literal":"=>"}, "_", "block_statement"], "postprocess": 
        (data) => {
            return {
                type: "function_literal",
                data: {
                    params: data[2],
                    block: data[8]
                }
            }
        }
            },
    {"name": "array_literal", "symbols": [{"literal":"["}, "_", "params", "_", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type: "array_literal",
                data: data[2]
            }
        }
            },
    {"name": "object_literal", "symbols": [{"literal":"{"}, "_", "params", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "object_literal",
                data: data[2]
            }
        }
            },
    {"name": "arithmetic_expression", "symbols": ["arithmetic_operand", "_", "arithmetic_operator", "_", "arithmetic_operand"]},
    {"name": "arithmetic_operand", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "arithmetic_operand", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "arithmetic_operator", "symbols": [{"literal":"/"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"*"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"+"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"-"}]},
    {"name": "arithmetic_operator", "symbols": [{"literal":"%"}]},
    {"name": "block_statement", "symbols": [{"literal":"{"}, (lexer.has("newline") ? {type: "newline"} : newline), "inputs", (lexer.has("newline") ? {type: "newline"} : newline), {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "block_statement",
                data: data[2]
            }
        }
            },
    {"name": "params", "symbols": ["params", "_", {"literal":","}, "_", "literal"], "postprocess": 
        (data) => [...data[0], data[4]]
            },
    {"name": "params", "symbols": ["literal"], "postprocess": 
        (data) => [data[0]]
            },
    {"name": "params", "symbols": []},
    {"name": "__", "symbols": [(lexer.has("wspace") ? {type: "wspace"} : wspace)]},
    {"name": "_", "symbols": ["__"]},
    {"name": "_", "symbols": []}
]
  , ParserStart: "inputs"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
