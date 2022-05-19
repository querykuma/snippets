/* eslint-disable max-lines-per-function, func-names */
/*
 * no-cond-func.js v1.0.0
 * https://github.com/querykuma/snippets/blob/master/eslint-rules/no-cond-func.js
 * (c) 2020 Query Kuma
 * Released under the MIT License
 *
 * The rule disallows evaluating functions as condition.
 *
 * Examples of incorrect code for this rule:
 *
 * function test1() {}
 * if (test1) {}
 * test1 ? 'y': 'n'
 * Boolean(test1)
 * true && test1
 *
 * Examples of correct code for this rule:
 *
 * function test1() {}
 * if (test1()) {}
 * test1() ? 'y': 'n'
 * Boolean(test1())
 * true && test1()
 *
 * This rule is also valid for ArrowFunction, Function Expression and class methods.
 *
 * const test2 = () => {}
 * const test3 = function() {}
 *
 * class A {
 *   if (this.method1) {}
 *   this.method1 () {}
 *   this.method2 = () => {}
 *   this.method3 = function() {}
 * }
 *
 * Options:
 *
 *  "no-cond-func": ["error", { "allowLogicalExpression": true }]
 *
 * There are valid cases to find an available function.
 * The allowLogicalExpression option allows to include functions in the LogicalExpression.
 *
 * Examples of correct code when allowLogicalExpression is true:
 *
 *  var func_available = functions.a || functions.b
 *
 */

module.exports = {
    "meta": {
        "type": "problem",

        "docs": {
            "description": "disallow evaluating functions as condition",
            "category": "Possible Errors",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-cond-func"
        },
        "fixable": "code",
        "schema": [
            {
                "type": "object",
                "properties": {
                    "allowLogicalExpression": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            }
        ]
    },
    create(context) {

        const DEBUG = false;
        const sourceCode = context.getSourceCode();
        let allowLogicalExpression = false;

        const check_options = () => {

            const opt = context.options[0];

            if (opt && opt.allowLogicalExpression)
                allowLogicalExpression = true;

        };

        check_options();

        // eslint-disable-next-line max-params
        const create_report = (node, message, type, node_fix, paren = true) => {

            const fix = (fixer) => fixer.replaceText(
                node_fix,
                paren
                    ? `(${sourceCode.getText(node_fix)})()`
                    : `${sourceCode.getText(node_fix)}()`
            );

            context.report({
                node,
                "message": `${message}${DEBUG ? `, ${type}` : ""}`,
                fix
            });

        };


        const find_var = (name) => {

            for (let scope = context.getScope(); scope; scope = scope.upper) {

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

        // eslint-disable-next-line max-params
        const check_func = (node, f_var, type, node_sub) => {

            if (f_var.defs)
                if (f_var.defs[0].type === "FunctionName" ||
                    (f_var.defs[0].type === "Variable" &&
                        f_var.defs[0].node.init &&
                        ["ArrowFunctionExpression", "FunctionExpression"].includes(f_var.defs[0].node.init.type))
                )
                    create_report(node, "evaluate function as condition", type, node_sub, false);

        };

        // eslint-disable-next-line max-params
        const check_method = (node, f_method, type, node_sub) => {

            if (f_method.type === "MethodDefinition" ||
                (f_method.type === "ClassProperty" &&
                    f_method.value &&
                    ["FunctionExpression", "ArrowFunctionExpression"].includes(f_method.value.type)))
                create_report(node, "evaluate method as condition", type, node_sub, false);

        };

        const check_sub = (node, node_sub, type) => {

            if (["ArrowFunctionExpression", "FunctionExpression"].includes(node_sub.type)) {

                create_report(node, "evaluate function as condition", node_sub.type, node_sub);

                return;

            }

            if (!["Identifier", "MemberExpression"].includes(node_sub.type))
                return;

            if (node_sub.name) {

                const f_var = find_var(node_sub.name);

                if (!f_var)
                    return;

                check_func(node, f_var, type, node_sub);

            } else if (node_sub.property.name && node_sub.object.type === "ThisExpression") {

                const f_method = find_method(node_sub.property.name);

                if (!f_method)
                    return;

                check_method(node, f_method, type, node_sub);

            }

        };

        return {
            IfStatement(node) {

                check_sub(node, node.test, "IfStatement");

            },

            ConditionalExpression(node) {

                check_sub(node, node.test, "ConditionalExpression");

            },

            LogicalExpression(node) {

                if (allowLogicalExpression)
                    return;

                check_sub(node, node.left, "LogicalExpression");
                check_sub(node, node.right, "LogicalExpression");

            },

            CallExpression(node) {

                if (!["Identifier", "MemberExpression"].includes(node.callee.type))
                    return;

                if (node.callee.name !== "Boolean")
                    return;

                const arg = node.arguments[0];

                if (["ArrowFunctionExpression", "FunctionExpression"].includes(arg.type)) {

                    create_report(node, "evaluate function as condition", arg.type, arg);

                    return;

                }

                if (!["Identifier", "MemberExpression"].includes(arg.type))
                    return;

                check_sub(node, arg, "CallExpression");

            }

        };

    }
};
