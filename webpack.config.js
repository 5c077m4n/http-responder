const path = require('path');

const cjsConfig = {
	target: 'node',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'packages/http-responder.cjs/src/'),
		filename: 'index.js',
		library: 'to',
		libraryTarget: 'commonjs2',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', { modules: 'cjs' }], '@babel/preset-typescript'],
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
};

const esmConfig = {
	target: 'node',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'packages/http-responder.esm/src/'),
		filename: 'index.js',
		library: 'to',
	},
	optimization: {
		usedExports: true,
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', { modules: false }], '@babel/preset-typescript'],
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
};

const umdConfig = {
	target: 'web',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'packages/http-responder.umd/src/'),
		filename: 'index.js',
		library: 'to',
		libraryTarget: 'umd',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', { modules: 'umd' }], '@babel/preset-typescript'],
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
};

module.exports = [cjsConfig, esmConfig, umdConfig];
