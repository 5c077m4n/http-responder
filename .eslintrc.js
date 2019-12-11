module.exports = {
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	rules: {
		'no-console': 'off',
		indent: ['warn', 'tab'],
	},
};
