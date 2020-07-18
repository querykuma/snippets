/* eslint-disable max-lines-per-function,func-names,require-jsdoc */
/*
 * no-in-array.js v1.1.0
 * https://github.com/querykuma/snippets/blob/master/eslint-rules/no-in-array.js
 * (c) 2020 Query Kuma
 * Released under the MIT License
 *
 * The rule disallows evaluating 'x in array' as condition.
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

module.exports = {
    "meta": {
        "type": "problem",

        "docs": {
            "description": "disallow evaluating 'x in array' as condition",
            "category": "Possible Errors",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-in-array"
        },
        "fixable": "code",
        "schema": []
    },
    create(context) {

        const sourceCode = context.getSourceCode();

        const find_var = (name) => {

            for (let scope = context.getScope(); scope.upper; scope = scope.upper) {

                const var_find = scope.variables.find((v) => v.name === name);

                if (var_find)
                    return var_find;

            }

            return void 0;

        };

        const find_method = (name) => {

            for (let scope = context.getScope(); scope.upper; scope = scope.upper) {

                if (scope.type !== "class")
                    continue;

                const method_find = scope.block.body.body.find((v) => v.key.type === "Identifier" &&
                    v.key.name === name);

                if (method_find)
                    return method_find;

            }

            return void 0;

        };

        const create_report = (node, message) => {

            const a = context.getDeclaredVariables(node);

            const fix = (fixer) => fixer.replaceText(
                node,
                `${sourceCode.getText(node.right)}.includes(${sourceCode.getText(node.left)})`
            );

            context.report({
                node,
                message,
                fix
            });

        };

        return {
            BinaryExpression(node) {

                if (node.operator === "in")

                    if (node.right.type === "ArrayExpression")
                        create_report(node, "evaluate 'x in array' as condition");

                    else if (node.right.type === "Identifier") {

                        let f_var = find_var(node.right.name);

                        if (f_var)
                            if (f_var.defs[0].type === "Parameter") {

                                if (f_var.defs[0].name.parent.type === "AssignmentPattern")
                                    f_var = f_var.defs[0].name.parent.right.type;

                            } else
                                f_var = f_var.defs[0].node.init.type;

                        if (f_var === "ArrayExpression")
                            create_report(node, "evaluate 'x in array' as condition");

                    } else if (node.right.type === "MemberExpression")
                        if (node.right.property.name && node.right.object.type === "ThisExpression") {

                            const f_method = find_method(node.right.property.name);

                            if (!f_method)
                                return;

                            if (f_method.value && f_method.value.type === "ArrayExpression")
                                create_report(node, "evaluate 'x in array' as condition");

                        }

            }
        };

    }
};
