import hr from '../src';

describe('Sanity', function() {
	it('Should throw an error for a bad input', function() {
		try {
			// eslint-disable-next-line no-unused-vars
			const httpObj = new hr({} as any);
		} catch (err) {
			expect(err.message).toEqual('The first parameter must be either a number or a string.');
			expect(err instanceof Error);
		}
	});
	it('Should test to see if the object is of http-responder type', function() {
		const hrObj = hr.improve(new Error('Test error'));
		expect(hrObj instanceof hr);
	});
	it('should change the status code', function() {
		const error = new hr(500);
		error.status = 501;
		expect((error as any).statusCode).toEqual(501);
	});
});

const payloadTestSuite = (error: any) => {
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
function responseTestSuite(
	title: string,
	error: HttpResponder,
	expectedStatus: number,
	expectedDefaultMessage: string,
	expectedMessage: string,
	expectedData: any
) {
	describe(title, function() {
		it('should exist', function() {
			expect(!!error);
		});
		it('should be of type HttpResponse', function() {
			expect(hr.isHR(new hr())).toEqual(true);
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
		['the default error', new hr(), 500, 'Internal Server Error'],
		['the default error', new hr('Waka Waka!'), 500, 'Internal Server Error', 'Waka Waka!'],
		['the custom error', new hr(490), 490, 'Unknown Status Code'],
		//@ts-ignore
		['the not found error', hr.notFound(), 404, 'Not Found'],
		//@ts-ignore
		['the locked error', hr.locked('Sorry, not today...'), 423, 'Locked', 'Sorry, not today...'],
		[
			'the server error with data',
			//@ts-ignore
			hr.internalServerError({
				bcz: 'dunno...',
			}),
			500,
			'Internal Server Error',
			undefined,
			{
				bcz: 'dunno...',
			},
		],
	]
		//@ts-ignore
		.forEach(test => responseTestSuite(...test));
});
