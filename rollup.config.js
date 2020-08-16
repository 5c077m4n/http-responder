const { terser } = require('rollup-plugin-terser');
const typescriptPlugin = require('@rollup/plugin-typescript');
const typescript = require('typescript');

module.exports = {
	input: './src/index.ts',
	output: [
		{
			file: './packages/http-responder.esm/src/index.mjs',
			format: 'esm',
		},
		{
			file: './packages/http-responder.cjs/src/index.js',
			format: 'cjs',
		},
		{
			name: 'HttpResponder',
			file: './packages/http-responder.umd/src/index.js',
			format: 'umd',
		},
	],
	plugins: [typescriptPlugin({ typescript }), terser()],
};
