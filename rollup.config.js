const { terser } = require('rollup-plugin-terser');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
	input: './src/index.ts',
	output: [
		{
			dir: './packages/http-responder.esm/src/',
			sourcemap: true,
			format: 'esm',
			plugins: [typescript({ outDir: './packages/http-responder.esm/src/' })],
		},
		{
			dir: './packages/http-responder.cjs/src/',
			sourcemap: true,
			format: 'cjs',
			plugins: [typescript({ outDir: './packages/http-responder.cjs/src/' })],
		},
		{
			name: 'HttpResponder',
			dir: './packages/http-responder.umd/src/',
			sourcemap: true,
			format: 'umd',
			plugins: [typescript({ outDir: './packages/http-responder.umd/src/' })],
		},
	],
	plugins: [terser()],
};
