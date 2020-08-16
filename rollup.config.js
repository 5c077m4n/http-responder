const { terser } = require('rollup-plugin-terser');
const typescriptPlugin = require('@rollup/plugin-typescript');
const typescript = require('typescript');

module.exports = {
	input: './src/index.ts',
	output: [
		{
			file: './packages/http-responder/src/index.mjs',
			format: 'esm',
		},
		{
			file: './packages/http-responder/src/index.cjs',
			format: 'cjs',
		},
	],
	plugins: [typescriptPlugin({ typescript }), terser()],
};
