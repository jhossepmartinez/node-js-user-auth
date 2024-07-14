import js from '@eslint/js';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    js.configs.recommended,

    {
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            'indent': ['error', 4],
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'semi': 'warn',
            '@stylistic/js/quotes': ['error', 'single']
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        }
    }
];
