module.exports = {
	roots: ['<rootDir>'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.ts$',
	moduleFileExtensions: ['ts', 'js'],
};
