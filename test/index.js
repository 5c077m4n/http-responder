const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const hrSrc = require('../src/index');
const hrDist = require('../dist/index');


describe('HttpResponder source', function() {
	describe('The default error', function() {
		const error = new hrSrc();
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 500.', function() {
				payload.should.have.property('statusCode').equal(500);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('message').equal('Internal Server Error');
			});
		});
	});
	describe('the custom 499 error', function() {
		const error = new hrSrc(499);
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(payload);
			});
			it('should have a status code of 499.', function() {
				payload.should.have.property('statusCode').equal(499);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('error').equal('Unknown Error');
			});
		});
	});
	describe('the not found error', function() {
		const error = hrSrc.notFound();
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(payload);
			});
			it('should have a status code of 404.', function() {
				payload.should.have.property('statusCode').equal(404);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('error').equal('Not Found');
			});
		});
	});
});

describe('HttpResponder distribution version', function() {
	describe('The default error', function() {
		const error = new hrDist();
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(error);
			});
			it('should have a status code of 500.', function() {
				payload.should.have.property('statusCode').equal(500);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('message').equal('Internal Server Error');
			});
		});
	});
	describe('the custom 499 error', function() {
		const error = new hrDist(499);
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(payload);
			});
			it('should have a status code of 499.', function() {
				payload.should.have.property('statusCode').equal(499);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('error').equal('Unknown Error');
			});
		});
	});
	describe('the not found error', function() {
		const error = hrDist.notFound();
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
		it('should have a payload.', function() {
			should.exist(error.payload);
		});
		describe('test payload', function() {
			const payload = error.payload;
			it('should exist.', function() {
				should.exist(payload);
			});
			it('should have a status code of 404.', function() {
				payload.should.have.property('statusCode').equal(404);
			});
			it('should check the default error message.', function() {
				payload.should.have.property('error').equal('Not Found');
			});
		});
	});
});
