const { HttpResponder } = require('../src/index');

describe('Commonjs require', () => {
	test('Sanity 1', () => {
		expect(HttpResponder).toBeTruthy();
	});

	test('Sanity 2', () => {
		const objError = HttpResponder.failedDependency('Error on external API');
		expect(objError).toBeTruthy();
	});
});
