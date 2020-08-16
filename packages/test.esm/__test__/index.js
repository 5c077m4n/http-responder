import { HttpResponder } from '../src/index';

describe('ES module import', () => {
	test('Sanity 1', () => {
		expect(HttpResponder).toBeTruthy();
	});

	test('Sanity 2', () => {
		const objError = HttpResponder.failedDependency('Error on external API');
		expect(objError).toBeTruthy();
	});
});
