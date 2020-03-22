const { terser } = require('rollup-plugin-terser');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
	input: './src/index.ts',
	output: [
		{
			outDir: './packages/http-responder.esm/src/',
			format: 'esm',
		},
		{
			outDir: './packages/http-responder.cjs/src/',
			format: 'cjs',
		},
		{
			name: 'HttpResponder',
			outDir: './packages/http-responder.umd/src/',
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
