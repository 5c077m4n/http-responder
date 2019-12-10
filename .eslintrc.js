module.exports = {
    env: {
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6
    },
    extends: 'eslint:recommended',
    rules: {
        'no-console': 'off',
        indent: ['warn', 'tab'],
    }
};
