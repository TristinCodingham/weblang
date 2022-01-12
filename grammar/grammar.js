// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const lexer = require('../lexer/lexer');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": ["statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1"]},
    {"name": "statement$ebnf$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["_", "statement_type", "statement$ebnf$1", "nl"], "postprocess": 
        (data) => data[1]
            },
    {"name": "statement_type", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "statement_type", "symbols": ["comment_statement"]},
    {"name": "assignment_statement$ebnf$1", "symbols": ["identifier"]},
    {"name": "assignment_statement$ebnf$1", "symbols": ["assignment_statement$ebnf$1", "identifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "assignment_statement", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword), "_", "assignment_statement$ebnf$1", "_", {"literal":"="}, "_", "assignable"], "postprocess": 
        (data) => [data[0], data[2], data[6]]
            },
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":","}, "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => [data[0], data[4]]
            },
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "assignable", "symbols": ["literal"]},
    {"name": "literal", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "literal", "symbols": ["object_literal"], "postprocess": id},
    {"name": "literal", "symbols": ["array_literal"], "postprocess": id},
    {"name": "object_literal$ebnf$1", "symbols": []},
    {"name": "object_literal$ebnf$1", "symbols": ["object_literal$ebnf$1", "object"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "object_literal", "symbols": [{"literal":"{"}, "_", "nl", "object_literal$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        (data) => data[3]
            },
    {"name": "object", "symbols": ["_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":"}, "_", "literal", "nl"], "postprocess": 
        (data) => [data[1], data[5]]
            },
    {"name": "array_literal$ebnf$1", "symbols": []},
    {"name": "array_literal$ebnf$1", "symbols": ["array_literal$ebnf$1", "array"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array_literal", "symbols": [{"literal":"["}, "_", "nl", "array_literal$ebnf$1", "_", {"literal":"]"}], "postprocess": 
        (data) => data[3]
            },
    {"name": "array$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "array$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array", "symbols": ["_", "literal", "_", "array$ebnf$1", "_", "nl"], "postprocess": 
        (data) => data[1]
            },
    {"name": "comment_statement", "symbols": ["_", (lexer.has("comment") ? {type: "comment"} : comment), "_"]},
    {"name": "_$ebnf$1", "symbols": [(lexer.has("wspace") ? {type: "wspace"} : wspace)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "nl$ebnf$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": id},
    {"name": "nl$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "nl", "symbols": ["nl$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
