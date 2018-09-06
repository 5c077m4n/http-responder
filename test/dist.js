const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const hr = require('../dist');


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
const responseTestSuite = (
	title,
	error,
	expectedStatus,
	expectedDefaultMessage,
	expectedMessage,
	expectedData
) => {
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

describe('HttpResponder distribution', function() {
	[
		['the default error', new hr(), 500, 'Internal Server Error'],
		['the default error', new hr('Waka Waka!'), 500, 'Internal Server Error', 'Waka Waka!'],
		['the custom error', new hr(499), 499, 'Unknown Status Code'],
		['the not found error', hr.notFound(), 404, 'Not Found'],
		['the locked error', hr.locked('Can\'t go here!'), 423, 'Locked', 'Can\'t go here!'],
		['the server error with data', hr.internalServerError({
			bcz: 'dunno...'
		}), 500, 'Internal Server Error', undefined, { bcz: 'dunno...' }]
	]
	.forEach(test => responseTestSuite(...test));
});
