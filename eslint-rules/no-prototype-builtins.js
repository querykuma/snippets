/**
 * Copyright (c) 2013 ESLint Team
 * Released under the MIT license
 * https://github.com/eslint/eslint/blob/main/LICENSE
 * Portions Copyright (c) 2022 Query Kuma
 *
 * @fileoverview Rule to disallow use of Object.prototype builtins on objects
 * @author Andrew Levine
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow calling some `Object.prototype` methods directly on objects",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-prototype-builtins"
        },

        schema: [],

        messages: {
            prototypeBuildIn: "Do not access Object.prototype method '{{prop}}' from target object."
        },

        fixable: "code"
    },

    create(context) {
        const DISALLOWED_PROPS = new Set([
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable"
        ]);

        const sourceCode = context.getSourceCode();

        /**
         * Reports if a disallowed property is used in a CallExpression
         * @param {ASTNode} node The CallExpression node.
         * @returns {void}
         */
        function disallowBuiltIns(node) {

            const callee = astUtils.skipChainExpression(node.callee);

            if (callee.type !== "MemberExpression") {
                return;
            }

            const propName = astUtils.getStaticPropertyName(callee);

            const fix = (fixer) => {
                if (propName === "hasOwnProperty") {
                    var s_arg = sourceCode.getText(node.arguments[0]);
                    var s_object = sourceCode.getText(node.callee).replace(/\.hasOwnProperty$/u, '');
                    var s_replace = `Object.prototype.hasOwnProperty.call(${s_object}, ${s_arg})`;

                    return fixer.replaceText(node, s_replace);
                }
            };

            if (propName !== null && DISALLOWED_PROPS.has(propName)) {
                context.report({
                    messageId: "prototypeBuildIn",
                    loc: callee.property.loc,
                    data: { prop: propName },
                    node,
                    fix
                });
            }
        }

        return {
            CallExpression: disallowBuiltIns
        };
    }
};
