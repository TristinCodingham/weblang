@{%
    const lexer = require('../lexer/lexer');
%}

@lexer lexer
inputs
    -> inputs input
    {%
        (data) => [...data[0], data[1]]
    %}
    | input
    {%
        (data) => [data[0]]
    %}
input
    -> statements
    {%
        (data) => {
            return {
                type: "statements",
                data: data[0]
            }
        }
    %}
    | expressions
    {%
        (data) => {
            return {
                type: "expressions",
                data: data[0]
            }
        }
    %}
statements
    -> _ statements %newline statement
    {%
        (data) => [...data[1], data[3]]
    %}
    | _ statement
    {%
        (data) => [data[1]]
    %}
expressions
    -> _ expressions %newline expression
    {%
        (data) => [...data[1], data[3]]
    %}
    | _ expression
    {%
        (data) => [data[1]]
    %}
statement
    -> assignment_literal
    {%
        (data) => {
            return {
                type: "assignment_literal",
                data: data[0]
            }
        }
    %}
expression
    -> arithmetic_expression
assignment_literal
    -> %keyword __ identifiers _ "=" _ literal
    {%
        (data) => {
            return {
                type: data[0],
                data: {
                    identifier_list: [...data[2]],
                    literal: data[6]
                }
            }
        }
    %}
identifiers
    -> identifiers _ "," _ %identifier
    {%
        (data) => [...data[0], data[4]]
    %}
    | %identifier
    {%
        (data) => [data[0]]
    %}
literal
    -> %number {% id %}
    | %string {% id %}
    | %identifier {% id %}
    | function_call {% id %}
    | function_literal {% id %}
    | array_literal {% id %}
    | object_literal {% id %}
    | arithmetic_expression {% id %}
    | null



function_call
    -> %identifier _ "(" _ params _ ")"
    {%
        (data) => {
            return {
                type: "function_call",
                data: {
                    identifier: data[0],
                    params: data[4]
                }
            }
        }
    %}
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
    -> "{" _ params _ "}"
    {%
        (data) => {
            return {
                type: "object_literal",
                data: data[2]
            }
        }
    %}
arithmetic_expression
    -> arithmetic_operand _ arithmetic_operator _ arithmetic_operand
arithmetic_operand
    -> %number {% id %}
    | %identifier {% id %}
arithmetic_operator
    -> "/"
    | "*"
    | "+"
    | "-"
    | "%"


block_statement
    -> "{" %newline inputs %newline "}"
    {%
        (data) => {
            return {
                type: "block_statement",
                data: data[2]
            }
        }
    %}

params
    -> params _ "," _ literal
    {%
        (data) => [...data[0], data[4]]
    %}
    | literal
    {%
        (data) => [data[0]]
    %}
    | null

__ -> %wspace
_ -> __ | null