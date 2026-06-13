import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

const localRules = {
    rules: {
        'sort-cn-arguments': {
            meta: {
                type: 'suggestion',
                fixable: 'code',
                docs: {
                    description:
                        'Sort string literal arguments in cn calls alphabetically',
                },
                schema: [],
            },
            create(context) {
                const sourceCode = context.sourceCode

                return {
                    CallExpression(node) {
                        if (
                            node.callee.type !== 'Identifier' ||
                            node.callee.name !== 'cn'
                        ) {
                            return
                        }

                        if (node.arguments.length < 2) {
                            return
                        }

                        const stringArguments = node.arguments.filter(
                            (argument) =>
                                argument.type === 'Literal' &&
                                typeof argument.value === 'string',
                        )

                        if (stringArguments.length !== node.arguments.length) {
                            return
                        }

                        const currentArguments = stringArguments.map(
                            (argument) => ({
                                text: sourceCode.getText(argument),
                                value: argument.value,
                            }),
                        )

                        const sortedArguments = [...currentArguments].sort(
                            (left, right) =>
                                left.value.localeCompare(right.value),
                        )

                        const isSorted = currentArguments.every(
                            (argument, index) =>
                                argument.value === sortedArguments[index].value,
                        )

                        if (isSorted) {
                            return
                        }

                        context.report({
                            node,
                            message:
                                'Sort string literal arguments in cn alphabetically.',
                            fix(fixer) {
                                return stringArguments.map((argument, index) =>
                                    fixer.replaceText(
                                        argument,
                                        sortedArguments[index].text,
                                    ),
                                )
                            },
                        })
                    },
                }
            },
        },
        'sort-jsx-props': {
            meta: {
                type: 'suggestion',
                fixable: 'code',
                docs: {
                    description: 'Sort JSX props alphabetically',
                },
                schema: [],
            },
            create(context) {
                const sourceCode = context.sourceCode

                return {
                    JSXOpeningElement(node) {
                        if (node.attributes.length < 2) {
                            return
                        }

                        if (
                            node.attributes.some(
                                (attribute) =>
                                    attribute.type !== 'JSXAttribute',
                            )
                        ) {
                            return
                        }

                        const currentAttributes = node.attributes.map(
                            (attribute) => ({
                                name: attribute.name.name,
                                text: sourceCode.getText(attribute),
                            }),
                        )

                        const sortedAttributes = [...currentAttributes].sort(
                            (left, right) =>
                                left.name.localeCompare(right.name),
                        )

                        const isSorted = currentAttributes.every(
                            (attribute, index) =>
                                attribute.name === sortedAttributes[index].name,
                        )

                        if (isSorted) {
                            return
                        }

                        context.report({
                            node,
                            message: 'Sort JSX props alphabetically.',
                            fix(fixer) {
                                return node.attributes.map((attribute, index) =>
                                    fixer.replaceText(
                                        attribute,
                                        sortedAttributes[index].text,
                                    ),
                                )
                            },
                        })
                    },
                }
            },
        },
    },
}

export default [
    {
        ignores: ['dist'],
    },

    js.configs.recommended,

    {
        files: ['**/*.{js,jsx,ts,tsx}'],

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },

            globals: {
                ...globals.browser,
            },
        },

        plugins: {
            local: localRules,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,

            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            'no-unused-vars': 'warn',
            'local/sort-cn-arguments': 'warn',
            'local/sort-jsx-props': 'warn',
            eqeqeq: 'error',
        },
    },

    prettier,

    {
        files: ['vite.config.ts', 'eslint.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]
