const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const hrSrc = require('../src/index');
const hrDist = require('../dist/index');


const testSuit = (title, hr) => {
	describe(title, function() {
		describe('The default error', function() {
			const error = new hr();
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 500.', function() {
				error.should.have.property('statusCode').equal(500);
			});
			it('should check the default error message.', function() {
				error.should.have.property('message').equal('Internal Server Error');
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
					payload.should.have.property('error').equal(error.message);
				});
			});
		});
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
		describe('the not found error', function() {
			const error = hr.notFound();
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 404.', function() {
				error.should.have.property('statusCode').equal(404);
			});
			it('should check the default error message.', function() {
				error.should.have.property('message').equal('Not Found');
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
					payload.should.have.property('error').equal(error.message);
				});
			});
		});
		describe('the locked error', function() {
			const error = hr.locked();
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 423.', function() {
				error.should.have.property('statusCode').equal(423);
			});
			it('should check the default error message.', function() {
				error.should.have.property('message').equal('Locked');
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
					payload.should.have.property('error').equal(error.message);
				});
			});
		});
	});
};

const hrTestList = [
	['HttpResponder source', hrSrc],
	['HttpResponder distribution version', hrDist]
];

hrTestList.forEach(testItem => testSuit(...testItem));
