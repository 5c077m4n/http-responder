import camelcase from '.';

describe('The camelcase function', function() {
	const correctStr = 'iAmATeapot';
	const testStrings = [
		'i am a teapot',
		'I am a  teapot',
		'i aM a teapot',
		'i am a teaPot',
		'I aM A teApoT',
		'I aM A TeAPOT',
		'I-aM~A`TeAPOT',
	];

	testStrings.forEach(testString => {
		it(`should camelcase the sentence "${testString}" => "${correctStr}"`, function() {
			expect(camelcase(testString)).toEqual(correctStr);
		});
	});
});
