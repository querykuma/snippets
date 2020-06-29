/* eslint-disable max-lines-per-function,func-names,require-jsdoc */
/*
 * no-in-array.js v1.0.0
 * https://github.com/querykuma/snippets/eslint-rules/no-in-array.js
 * (c) 2020 Query Kuma
 * Released under the MIT License
 *
 * The in + array is a troublemaker.
 *
 * > 0 in [1, 2]
 * true
 * > 1 in [1, 2]
 * true
 * > 2 in [1, 2]
 * false
 *
 * Examples of correct code for this rule:
 * > [1, 2].includes(0)
 * false
 * > [1, 2].includes(1)
 * true
 * > [1, 2].includes(2)
 * true
 */
module.exports = function (context) {

    function find_var(name) {

        for (let scope = context.getScope(); scope.upper; scope = scope.upper) {

            const var_find = scope.variables.find((v) => v.name === name);

            if (var_find)
                return var_find;

        }

        return void 0;

    }
    const sourceCode = context.getSourceCode();

    return {
        "BinaryExpression"(node) {

            const fix = (fixer) => fixer.replaceText(node, `${sourceCode.getText(node.right)}.includes(${sourceCode.getText(node.left)})`);

            if (node.operator === "in")

                if (node.right.type === "ArrayExpression") {

                    context.report({
                        node,
                        "message": "in + array is a troublemaker",
                        fix
                    });

                } else if (node.right.type === "Identifier") {

                    let a = find_var(node.right.name);

                    if (a)
                        a = a.defs[0].node.init.type;
                    if (a === "ArrayExpression")
                        context.report({
                            node,
                            "message": "in + array is a troublemaker(variable init)",
                            fix
                        });

                }


        }
    };

};

module.exports.schema = [];
