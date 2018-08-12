const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const hrSrc = require('../src/index');
const hrDist = require('../dist/index');


const knownPayloadTestSiute = error => {
	describe('test payload', function() {
		const payload = error.payload;
		it('should exist.', function() {
			should.exist(payload);
		});
		it('should have a status code of the original object.', function() {
			payload.should.have.property('statusCode').equal(error.statusCode);
		});
		it('should check the default error message is equal to the original one.', function() {
			payload.should.have.property('error').equal(error.message);
		});
	});
};
const knownErrorTestSiute = (title, error, expectedStatus, expectedMessage) => {
	describe(title, function() {
		it('should exist.', function() {
			should.exist(error);
		});
		it(`should have a status code of ${expectedStatus}.`, function() {
			error.should.have.property('statusCode').equal(expectedStatus);
		});
		it('should check the default error message.', function() {
			error.should.have.property('message').equal(expectedMessage);
		});
		it('should have a status getter equal to statusCode.', function() {
			error.should.have.property('statusCode').equal(error.status);
		});
	});
	knownPayloadTestSiute(error);
};
const testSuite = (title, hr) => {
	describe(title, function() {
		knownErrorTestSiute('the default error', new hr(), 500, 'Internal Server Error');
		describe('the custom 499 error', function() {
			const error = new hr(499);
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 499.', function() {
				error.should.have.property('statusCode').equal(499);
			});
			it('should check the default error message.', function() {
				error.should.have.property('message').to.be.an('undefined');
			});
			it('should have a status getter equal to statusCode.', function() {
				error.should.have.property('statusCode').equal(error.status);
			});
			describe('test payload', function() {
				const payload = error.payload;
				it('should exist.', function() {
					should.exist(payload);
				});
				it('should have a status code of the original.', function() {
					payload.should.have.property('statusCode').equal(error.statusCode);
				});
				it('should check the default error message is equal to the original one.', function() {
					payload.should.have.property('error').equal('Unknown Error');
				});
			});
		});
		knownErrorTestSiute('the not found error', hr.notFound(), 404, 'Not Found');
		knownErrorTestSiute('the locked error', hr.locked(), 423, 'Locked');
	});
};

const hrTestList = [
	['HttpResponder source', hrSrc],
	['HttpResponder distribution version', hrDist]
];
hrTestList.forEach(testItem => testSuite(...testItem));
