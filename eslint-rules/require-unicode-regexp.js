/**
 * Copyright (c) 2013 ESLint Team
 * Released under the MIT license
 * https://github.com/eslint/eslint/blob/main/LICENSE
 *
 * @fileoverview Rule to enforce the use of `u` flag on RegExp.
 * @author Toru Nagashima
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {
    CALL,
    CONSTRUCT,
    ReferenceTracker,
    getStringIfConstant
} = require("eslint-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "enforce the use of `u` flag on RegExp",
            recommended: false,
            url: "https://eslint.org/docs/rules/require-unicode-regexp"
        },

        messages: {
            requireUFlag: "Use the 'u' flag."
        },

        fixable: "code",

        schema: []
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {
            "Literal[regex]"(node) {

                const fix = (fixer) => {
                    return fixer.replaceText(node, node.value + 'u');
                };

                const flags = node.regex.flags || "";

                if (!flags.includes("u")) {
                    context.report({ node, messageId: "requireUFlag", fix });
                }
            },

            Program() {
                const scope = context.getScope();
                const tracker = new ReferenceTracker(scope);
                const trackMap = {
                    RegExp: { [CALL]: true, [CONSTRUCT]: true }
                };

                for (const { node } of tracker.iterateGlobalReferences(trackMap)) {

                    const fix = (fixer) => {
                        if (node.arguments[1]) {
                            var text1 = sourceCode.getText(node.arguments[1]);
                            var result = text1.replace(/(?=['"])$/u, "u");
                            return fixer.replaceText(node.arguments[1], result);
                        } else {
                            return fixer.insertTextAfter(node.arguments[0], ', "u"');
                        }
                    };

                    const flagsNode = node.arguments[1];
                    const flags = getStringIfConstant(flagsNode, scope);

                    if (!flagsNode || (typeof flags === "string" && !flags.includes("u"))) {
                        context.report({ node, messageId: "requireUFlag", fix });
                    }
                }
            }
        };
    }
};
