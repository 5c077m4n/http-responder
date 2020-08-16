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

describe('CJS Functionality', function() {
	it('Should throw an error for a bad input', function() {
		try {
			new HttpResponder({});
		} catch (err) {
			expect(err.message).toEqual('The first parameter must be either a number or a string.');
			expect(err instanceof Error);
		}
	});
	it('Should test to see if the object is of http-responder type', function() {
		const hrObj = HttpResponder.improve(new Error('Test error'));
		expect(hrObj instanceof HttpResponder);
	});
	it('should change the status code', function() {
		const error = new HttpResponder(500);
		error.status = 501;
		expect(error.statusCode).toEqual(501);
	});
});

const payloadTestSuite = error => {
	describe('test payload', function() {
		const payload = error.payload;
		it('should exist.', function() {
			expect(!!payload);
		});
		it('should have a status code of the original object', function() {
			expect(payload.statusCode).toEqual(error.statusCode);
		});
		it('should have the data of the original object', function() {
			expect(payload.data).toEqual(error.data);
		});
		it('should have the message of the original object', function() {
			expect(payload.message).toEqual(error.message);
		});
		it('should have the data of the original error', function() {
			expect(payload.data).toEqual(error.data);
		});
	});
};
function responseTestSuite(title, error, expectedStatus, expectedDefaultMessage, expectedMessage, expectedData) {
	describe(title, function() {
		it('should exist', function() {
			expect(!!error);
		});
		it('should be of type HttpResponse', function() {
			expect(HttpResponder.isHR(new HttpResponder())).toEqual(true);
		});
		it(`should have a status code of ${expectedStatus}`, function() {
			expect(error.statusCode).toEqual(expectedStatus);
		});
		it('should check the default status description', function() {
			expect(error.statusDesc).toEqual(expectedDefaultMessage);
		});
		it('should check the custom message', function() {
			expect(error.message).toEqual(expectedMessage);
		});
		it('should have a status getter equal to statusCode', function() {
			expect(error.statusCode).toEqual(error.status);
		});
		it('should have the same message for statusDesc and for statusText', function() {
			expect(error.statusDesc).toEqual(error.statusText);
		});
		it('should have the expected data', function() {
			expect(error.data).toEqual(expectedData);
		});
		it('should have a body with the expected data', function() {
			expect(error.data).toEqual(error.body);
		});
	});
	payloadTestSuite(error);
}

describe('HttpResponder source', function() {
	[
		['the default error', new HttpResponder(), 500, 'Internal Server Error'],
		['the default error', new HttpResponder('Waka Waka!'), 500, 'Internal Server Error', 'Waka Waka!'],
		['the custom error', new HttpResponder(490), 490, 'Unknown Status Code'],
		['the not found error', HttpResponder.notFound(), 404, 'Not Found'],
		[
			'the failed dep',
			HttpResponder.failedDependency('Error on external API'),
			424,
			'Failed Dependency',
			'Error on external API',
		],
		['the locked error', HttpResponder.locked('Sorry, not today...'), 423, 'Locked', 'Sorry, not today...'],
		[
			'the server error with data',
			HttpResponder.internalServerError({
				bcz: 'dunno...',
			}),
			500,
			'Internal Server Error',
			undefined,
			{
				bcz: 'dunno...',
			},
		],
	].forEach(test => responseTestSuite(...test));
});
