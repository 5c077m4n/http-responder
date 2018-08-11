'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var camelCase = require('camelcase');

/**
 * @param codeMap - a complete map of status codes.
 */
var codeMap = new Map([[100, 'Continue'], [101, 'Switching Protocols'], [102, 'Processing'], [200, 'OK'], [201, 'Created'], [202, 'Accepted'], [203, 'Non-Authoritative Information'], [204, 'No Content'], [205, 'Reset Content'], [206, 'Partial Content'], [207, 'Multi-Status'], [300, 'Multiple Choices'], [301, 'Moved Permanently'], [302, 'Moved Temporarily'], [303, 'See Other'], [304, 'Not Modified'], [305, 'Use Proxy'], [307, 'Temporary Redirect'], [400, 'Bad Request'], [401, 'Unauthorized'], [402, 'Payment Required'], [403, 'Forbidden'], [404, 'Not Found'], [405, 'Method Not Allowed'], [406, 'Not Acceptable'], [407, 'Proxy Authentication Required'], [408, 'Request Time-out'], [409, 'Conflict'], [410, 'Gone'], [411, 'Length Required'], [412, 'Precondition Failed'], [413, 'Request Entity Too Large'], [414, 'Request-URI Too Large'], [415, 'Unsupported Media Type'], [416, 'Requested Range Not Satisfiable'], [417, 'Expectation Failed'], [418, 'I am a teapot'], [422, 'Unprocessable Entity'], [423, 'Locked'], [424, 'Failed Dependency'], [425, 'Unordered Collection'], [426, 'Upgrade Required'], [428, 'Precondition Required'], [429, 'Too Many Requests'], [431, 'Request Header Fields Too Large'], [451, 'Unavailable For Legal Reasons'], [500, 'Internal Server Error'], [501, 'Not Implemented'], [502, 'Bad Gateway'], [503, 'Service Unavailable'], [504, 'Gateway Time-out'], [505, 'HTTP Version Not Supported'], [506, 'Variant Also Negotiates'], [507, 'Insufficient Storage'], [509, 'Bandwidth Limit Exceeded'], [510, 'Not Extended'], [511, 'Network Authentication Required']]);

/**
 * @class HttpResponder - a class containing all static functions that create the responses,
 * with getters ang setters.
 */

var HttpResponder = function (_Error) {
	_inherits(HttpResponder, _Error);

	function HttpResponder() {
		var statusCodeOrMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
		var errorOrOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, HttpResponder);

		var _this = _possibleConstructorReturn(this, (HttpResponder.__proto__ || Object.getPrototypeOf(HttpResponder)).call(this));

		Object.assign(_this, errorOrOptions);
		if (typeof statusCodeOrMessage === 'number') _this.statusCode = statusCodeOrMessage;else {
			if (typeof statusCodeOrMessage === 'string') {
				_this.statusCode = errorOrOptions.statusCode || errorOrOptions.status || 500;
				_this.message = statusCodeOrMessage;
			} else throw new Error('The first parameter must be either a number or a string.');
		}
		if (!_this.message) _this.message = codeMap.get(_this.statusCode);
		_this._isRespError = true;
		return _this;
	}

	_createClass(HttpResponder, [{
		key: 'appendError',
		value: function appendError(err) {
			return Object.assign(this, err);
		}
	}, {
		key: 'status',
		get: function get() {
			return this.statusCode;
		},
		set: function set(code) {
			this.statusCode = code;
			return code;
		}
	}, {
		key: 'isRespError',
		get: function get() {
			return this._isRespError;
		}
	}, {
		key: 'payload',
		get: function get() {
			return {
				statusCode: this.statusCode,
				error: codeMap.has(this.statusCode) ? codeMap.get(this.statusCode) : 'Unknown Error',
				message: this.message,
				data: this.data ? this.data : undefined
			};
		}
	}], [{
		key: 'improve',
		value: function improve(err) {
			return new HttpResponder(500, err);
		}
	}, {
		key: 'isHR',
		value: function isHR(err) {
			return err instanceof HttpResponder && err.isRespError;
		}
	}]);

	return HttpResponder;
}(Error);

;

/**
 * @function build - adds dynamically all of the codeMap's values as functions.
 * @returns HttpResponder - the class with all static functions attached.
 */
function build() {
	codeMap.forEach(function (value, key, map) {
		HttpResponder[camelCase(value)] = function (msg, data) {
			return new HttpResponder(key, {
				statusCode: key,
				error: codeMap.get(key),
				message: msg,
				data: data
			});
		};
	});
	return HttpResponder;
}

module.exports = build();