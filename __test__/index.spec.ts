/// <reference no-default-lib="true"/>
import { expect, should as shouldFn } from 'chai';
const should = shouldFn();

import hr from '../src';
import camelcase from '../src/libs/camelcase';

describe('Sanity', function() {
	it('Should throw an error for a bad input', function() {
		try {
			// eslint-disable-next-line no-unused-vars
			const httpObj = new hr({});
		} catch (err) {
			expect(err.message).equal('The first parameter must be either a number or a string.');
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
		expect((error as any).statusCode).to.equal(501);
	});
});

const payloadTestSuite = error => {
	describe('test payload', function() {
		const payload = error.payload;
		it('should exist.', function() {
			should.exist(payload);
		});
		it('should have a status code of the original object', function() {
			expect(payload.statusCode).equal(error.statusCode);
		});
		it('should have the data of the original object', function() {
			expect(payload.data).equal(error.data);
		});
		it('should have the message of the original object', function() {
			expect(payload.message).equal(error.message);
		});
		it('should have the data of the original error', function() {
			expect(payload.data).to.deep.equal(error.data);
		});
	});
};
const responseTestSuite = (title, error, expectedStatus, expectedDefaultMessage, expectedMessage, expectedData) => {
	describe(title, function() {
		it('should exist', function() {
			should.exist(error);
		});
		it('should be of type HttpResponse', function() {
			expect(hr.isHR(new hr())).equal(true);
		});
		it(`should have a status code of ${expectedStatus}`, function() {
			error.should.have.property('statusCode').equal(expectedStatus);
		});
		it('should check the default status description', function() {
			error.should.have.property('statusDesc').equal(expectedDefaultMessage);
		});
		it('should check the custom message', function() {
			expect(error.message).equal(expectedMessage);
		});
		it('should have a status getter equal to statusCode', function() {
			expect(error.statusCode).equal(error.status);
		});
		it('should have the same message for statusDesc and for statusText', function() {
			expect(error.statusDesc).equal(error.statusText);
		});
		it('should have the expected data', function() {
			expect(error.data).to.deep.equal(expectedData);
		});
		it('should have a body with the expected data', function() {
			expect(error.data).to.deep.equal(error.body);
		});
	});
	payloadTestSuite(error);
};

describe('HttpResponder source', function() {
	[
		['the default error', new hr(), 500, 'Internal Server Error'],
		['the default error', new hr('Waka Waka!'), 500, 'Internal Server Error', 'Waka Waka!'],
		['the custom error', new hr(490), 490, 'Unknown Status Code'],
		['the not found error', hr.notFound(), 404, 'Not Found'],
		['the locked error', hr.locked('Sorry, not today...'), 423, 'Locked', 'Sorry, not today...'],
		[
			'the server error with data',
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
	].forEach(test => responseTestSuite(...test));
});

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

	testStrings.forEach(testString =>
		it(`should camelcase the sentence "${testString}" => "${correctStr}"`, function() {
			expect(camelcase(testString)).to.deep.equal(correctStr);
		})
	);
});