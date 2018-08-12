const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const hrSrc = require('../src/index');
const hrDist = require('../dist/index');


const payloadTestSuite = error => {
	describe('test payload', function() {
		const payload = error.payload;
		it('should exist.', function() {
			should.exist(payload);
		});
		it('should have a status code of the original object', function() {
			payload.should.have.property('statusCode').equal(error.statusCode);
		});
		it('should have a data of the original object', function() {
			payload.should.have.property('data').equal(error.data);
		});
	});
};
const responseTestSuite = (title, error, expectedStatus, expectedDefaultMessage, expectedMessage) => {
	describe(title, function() {
		it('should exist', function() {
			should.exist(error);
		});
		it(`should have a status code of ${expectedStatus}`, function() {
			error.should.have.property('statusCode').equal(expectedStatus);
		});
		it('should check the default status description', function() {
			error.should.have.property('statusDesc').equal(expectedDefaultMessage);
		});
		it('should check the custom message', function() {
			error.should.have.property('message').equal(expectedMessage);
		});
		it('should have a status getter equal to statusCode', function() {
			error.should.have.property('statusCode').equal(error.status);
		});
	});
	payloadTestSuite(error);
};
const testSuite = (title, hr) => {
	describe(title, function() {
		[
			['the default error', new hr(), 500, 'Internal Server Error', ''],
			['the custom error', new hr(499), 499, 'Unknown Status Code', ''],
			['the not found error', hr.notFound(), 404, 'Not Found'],
			['the locked error', hr.locked('Can\'t go here!'), 423, 'Locked', 'Can\'t go here!']
		]
		.forEach(item => responseTestSuite(...item));
	});
};

[
	['HttpResponder source', hrSrc],
	['HttpResponder distribution version', hrDist]
]
.forEach(item => testSuite(...item));
