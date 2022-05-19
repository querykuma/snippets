/**
 * Copyright (c) 2013 ESLint Team
 * Released under the MIT license
 * https://github.com/eslint/eslint/blob/main/LICENSE
 * Portions Copyright (c) 2022 Query Kuma
 *
 * @fileoverview Rule to check for tabs inside a file
 * @author Gyandeep Singh
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const tabRegex = /\t+/gu;
const anyNonWhitespaceRegex = /\S/u;

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "disallow all tabs",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-tabs"
        },
        schema: [{
            type: "object",
            properties: {
                allowIndentationTabs: {
                    type: "boolean",
                    default: false
                }
            },
            additionalProperties: false
        }],

        messages: {
            unexpectedTab: "Unexpected tab character."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const allowIndentationTabs = context.options && context.options[0] && context.options[0].allowIndentationTabs;

        /**
         * Given a list of comment nodes, return the line numbers for those comments.
         * @param {Array} comments An array of comment nodes.
         * @returns {number[]} An array of line numbers containing comments.
         */
        function getCommentLineNumbers(comments) {
            const lines = new Set();

            comments.forEach(comment => {
                const endLine = comment.type === "Block"
                    ? comment.loc.end.line - 1
                    : comment.loc.end.line;

                for (let i = comment.loc.start.line; i <= endLine; i++) {
                    lines.add(i);
                }
            });

            return lines;
        }

        return {
            Program(node) {
                var comments = sourceCode.getAllComments();
                var commentLineNumbers = getCommentLineNumbers(comments);

                sourceCode.getLines().forEach((line, index) => {
                    let match;

                    while ((match = tabRegex.exec(line)) !== null) {
                        if (allowIndentationTabs && !anyNonWhitespaceRegex.test(line.slice(0, match.index))) {
                            continue;
                        }

                        if (commentLineNumbers.has(index + 1)) {
                            return;
                        }

                        context.report({
                            node,
                            loc: {
                                start: {
                                    line: index + 1,
                                    column: match.index
                                },
                                end: {
                                    line: index + 1,
                                    column: match.index + match[0].length
                                }
                            },
                            messageId: "unexpectedTab"
                        });
                    }
                });
            }
        };
    }
};
