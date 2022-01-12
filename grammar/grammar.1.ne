@{%
    const lexer = require('../lexer/lexer');
%}

@lexer lexer

# Entry
program
    -> statements:+ # 1 or more statement
    {%
        (data) => {
            return {
                type: "program",
                data: data[0]
            }
        }
    %}

statements
    -> _ statement _ nl
    {%
        (data) => {
            return {
                type: "statements",
                data: data[1]
            }
        }
    %}

statement
    -> assignment_statement
    {%
        (data) => {
            return {
                type: "statement",
                data: data[0]
            }
        }
    %}
    | expression_statement
    {%
        (data) => {
            return {
                type: "statement",
                data: data[0]
            }
        }
    %}
    | import_statement
    {%
        (data) => {
            return {
                type: "statement",
                data: data[0]
            }
        }
    %}

# Statements
assignment_statement
    -> assignment_literal
    {%
        (data) => {
            return {
                type: "assignment_statement",
                data: data[0]
            }
        }
    %}

expression_statement
    -> arithmetic_expression
    {%
        (data) => {
            return {
                type: "expression_statement",
                data: data[0]
            }
        }
    %}
    | function_call
    {%
        (data) => {
            return {
                type: "expression_statement",
                data: data[0]
            }
        }
    %}

import_statement
    -> "use" __ %string
    {%
        (data) => {
            return {
                type: "import_statement",
                data: data[2]
            }
        }
    %}

# Statement children
assignment_literal
    -> %keyword __ identifiers _ "=" _ assingable # dyn num1, num2 = 10
    {%
        (data) => {
            return {
                type: "assignment_literal",
                data: {
                    keyword: data[0],
                    identifiers: data[2],
                    literal: data[6]
                }
            }
        }
    %}
    | %keyword _ "=" _ assingable # stylesheet = use "./style.css"
    {%
        (data) => {
            return {
                type: "assignment_direct",
                data: {
                    keyword: data[0],
                    literal: data[4]
                }
            }
        }
    %}
    | identifiers _ "=" _ assingable # num1, num2 = 20
    {%
        (data) => {
            return {
                type: "assignment_override",
                data: {
                    identifier: data[0],
                    literal: data[4]
                }
            }
        }
    %}

arithmetic_expression
    -> arithmetic_operand _ arithmetic_operator _ arithmetic_operand
    {%
        (data) => {
            return {
                type: "arithmetic_expression",
                data: {
                    operands: [data[0], data[4]],
                    operator: data[2]
                }
            }
        }
    %}

function_call
    -> %identifier "(" _ params _ ")"
    {%
        (data) => {
            return {
                type: "function_call",
                data: {
                    identifier: data[0],
                    params: data[3]
                }
            }
        }
    %}
# End of statements




# Helpers
identifiers
    -> identifiers _ "," _ %identifier
    {%
        (data) => {
            return {
                type: "identifiers",
                data: [data[0], data[4]]
            }
        }
    %}
    | %identifier {% id %}

function_literal
    -> "(" _ params _ ")" _ "=>" _ block_statement
    {%
        (data) => {
            return {
                type: "function_literal",
                data: {
                    params: data[2],
                    block: data[8]
                }
            }
        }
    %}

array_literal
    -> "[" _ params _ "]"
    {%
        (data) => {
            return {
                type: "array_literal",
                data: data[2]
            }
        }
    %}

object_literal
    -> "{" nl objects nl "}"
    {%
        (data) => {
            return {
                type: "object_literal",
                data: data[1]
            }
        }
    %}

objects
    -> objects delimeter %newline object
    {%
        (data) => {
            return {
                type: "objects",
                data: [data[0], data[3]]
            }
        }
    %}
    | object {% id %}

object
    -> %identifier _ ":" _ literal
    {%
        (data) => {
            return {
                type: "object",
                data: [data[0], data[4]]
            }
        }
    %}

block_statement
    -> "{" nl statements nl "}"
    {%
        (data) => {
            return {
                type: "block_statement",
                data: data[2]
            }
        }
    %}

literal
    -> %number {% id %}
    | %string {% id %}
    | %bool {% id %}
    | %identifier {% id %}
    | function_literal {% id %}
    | array_literal {% id %}
    | object_literal {% id %}
    | arithmetic_expression {% id %}
    | null

assingable
    -> literal {% id %}
    | import_statement {% id %}
    | function_call {% id %}

arithmetic_operand
    -> %number {% id %}
    | %identifier {% id %}

arithmetic_operator
    -> "/" {% id %}
    | "*" {% id %}
    | "+" {% id %}
    | "-" {% id %}
    | "%" {% id %}

params
    -> params delimeter param
    {%
        (data) => {
            return {
                type: "params",
                data: [data[0, data[2]]]
            }
        }
    %}
    | param {% id %}

param
    -> literal
    {%
        (data) => {
            return {
                type: "param",
                data: data[0]
            }
        }
    %}

delimeter
    -> "," _
    | __

__ -> %wspace

_ -> __ | null

nl -> %newline | null

comment -> %comment | null