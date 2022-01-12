@{%
    const lexer = require('../lexer/lexer');
%}

@lexer lexer

# Entry
statements
    -> statement:+

statement
    -> _ statement_type %comment:? nl
    {%
        (data) => data[1]
    %}

statement_type
    -> assignment_statement {% id %}
    | comment_statement

assignment_statement
    -> %keyword _ identifier:+ _ "=" _ assignable
    {%
        (data) => [data[0], data[2], data[6]]
    %}

identifier
    -> %identifier _ "," _ %identifier
    {%
        (data) => [data[0], data[4]]
    %}
    | %identifier {% id %}

assignable
    -> literal

literal
    -> %string {% id %}
    | %number {% id %}
    | %bool {% id %}
    | %identifier {% id %}
    | object_literal {% id %}
    | array_literal {% id %}

object_literal
    -> "{" _ nl object:* _ "}"
    {%
        (data) => data[3]
    %}

object
    -> _ %identifier _ ":" _ literal nl
    {%
        (data) => [data[1], data[5]]
    %}

array_literal
    -> "[" _ nl array:* _ "]"
    {%
        (data) => data[3]
    %}

array
    -> _ literal _ ",":? _ nl
    {%
        (data) => data[1]
    %}

comment_statement
    -> _ %comment _

_ -> %wspace:?
nl -> %newline:?