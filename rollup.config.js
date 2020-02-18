const { terser } = require('rollup-plugin-terser');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
	input: './src/index.ts',
	output: [
		{
			dir: './packages/http-responder.esm/src/',
			format: 'esm',
		},
		{
			dir: './packages/http-responder.cjs/src/',
			format: 'cjs',
		},
		{
			name: 'HttpResponder',
			dir: './packages/http-responder.umd/src/',
			format: 'umd',
		},
	],
	plugins: [
		typescript({
			typescript: require('typescript'),
		}),
		terser(),
	],
};
