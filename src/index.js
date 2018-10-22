'use strict';

const camelcase = str => {
	str = str.replace(/^[A-Z]{2,}/g, match => match.toLowerCase());
	str = str.replace(/\W/gi, '');
	return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * @param codeMap - a complete map of status codes.
 */
const codeMap = new Map([
	[100, `Continue`],
	[101, `Switching Protocols`],
	[102, `Processing`],
	[103, `Early Hints`],
	[200, `OK`],
	[201, `Created`],
	[202, `Accepted`],
	[203, `Non-Authoritative Information`],
	[204, `No Content`],
	[205, `Reset Content`],
	[206, `Partial Content`],
	[207, `Multi-Status`],
	[208, `Already Reported`],
	[226, `IM Used`],
	[300, `Multiple Choices`],
	[301, `Moved Permanently`],
	[302, `Found`],
	[303, `See Other`],
	[304, `Not Modified`],
	[305, `Use Proxy`],
	[306, `Switch Proxy`],
	[307, `Temporary Redirect`],
	[308, `Permanent Redirect`],
	[400, `Bad Request`],
	[401, `Unauthorized`],
	[402, `Payment Required`],
	[403, `Forbidden`],
	[404, `Not Found`],
	[405, `Method Not Allowed`],
	[406, `Not Acceptable`],
	[407, `Proxy Authentication Required`],
	[408, `Request Time-out`],
	[409, `Conflict`],
	[410, `Gone`],
	[411, `Length Required`],
	[412, `Precondition Failed`],
	[413, `Payload Too Large`],
	[414, `URI Too Long`],
	[415, `Unsupported Media Type`],
	[416, `Requested Range Not Satisfiable`],
	[417, `Expectation Failed`],
	[418, `I Am A Teapot`],
	[421, `Misdirected Request`],
	[422, `Unprocessable Entity`],
	[423, `Locked`],
	[424, `Failed Dependency`],
	[425, `Unordered Collection`],
	[426, `Upgrade Required`],
	[428, `Precondition Required`],
	[429, `Too Many Requests`],
	[431, `Request Header Fields Too Large`],
	[451, `Unavailable For Legal Reasons`],
	[499, `Client Closed Request`],
	[500, `Internal Server Error`],
	[501, `Not Implemented`],
	[502, `Bad Gateway`],
	[503, `Service Unavailable`],
	[504, `Gateway Time-out`],
	[505, `HTTP Version Not Supported`],
	[506, `Variant Also Negotiates`],
	[507, `Insufficient Storage`],
	[509, `Bandwidth Limit Exceeded`],
	[510, `Not Extended`],
	[511, `Network Authentication Required`],
	[599, `Network Connect Timeout Error`]
]);

/**
 * @class HttpResponder - a class containing all static
 * functions that create the responses, with getters and
 * setters.
 */
class HttpResponder extends Error {
	constructor(statusCodeOrMessage = 500, errorOrOptions = {}) {
		super();
		Object.assign(this, errorOrOptions);
		this._isHttpRes = true;
		if(typeof statusCodeOrMessage === 'number') {
			this.statusCode = statusCodeOrMessage;
			this.message = (errorOrOptions.message)?
				errorOrOptions.message : undefined;
		}
		else {
			if(typeof statusCodeOrMessage === 'string') {
				this.message = statusCodeOrMessage;
				this.statusCode = errorOrOptions.statusCode
					|| errorOrOptions.status
					|| 500;
			}
			else throw new Error(
				'The first parameter must be either a number or a string.'
			);
		}
	}

	/** Getters and setters */
	get status() {
		return this.statusCode;
	}
	set status(code) { this.statusCode = code; }
	get statusDesc() {
		return (codeMap.has(this.statusCode))?
			codeMap.get(this.statusCode) : 'Unknown Status Code';
	}
	set statusDesc(_) { throw new Error('This property is read-only.'); }
	get statusText() { return this.statusDesc; }
	set statusText(_) { throw new Error('This property is read-only.'); }
	get body() { return this.data; }
	set body(data) { this.data = data; }
	get payload() {
		const self = this;
		return {
			statusCode: self.statusCode,
			statusDesc: self.statusDesc,
			message: (self.message && self.message.length)? self.message : undefined,
			data: (self.data)? self.data : undefined,
			log: () => console.log(JSON.stringify(self.payload))
		};
	}
	set payload(_) { throw new Error('This property is read-only.'); }

	/** Append new responses to the exisisting HttpResponse */
	appendError(err) {
		return Object.assign(this, err);
	}
	/** Return a response to the client (express 4.x) */
	end(res) {
		return res.status(this.statusCode).json(this.payload);
	}
	send(res) { return this.end(res); }
	json(res) { return this.end(res); }
	log() {
		console.log(JSON.stringify(this));
	}

	/** Static functions */
	static improve(err) {
		return new HttpResponder(500, err);
	}
	static isHR(res) {
		return ((res.constructor === HttpResponder) && res._isHttpRes);
	}
}

/**
 * @function build - adds dynamically all of the codeMap's
 * values as functions.
 * @returns HttpResponder - the class with all static functions
 * attached.
 */
function build() {
	codeMap.forEach((value, key) => {
		HttpResponder[camelcase(value)] = function(msgOrData, data) {
			return new HttpResponder(key, {
				statusCode: key,
				message: ((typeof msgOrData === 'string') && msgOrData.length)?
					msgOrData : undefined,
				data: (typeof msgOrData !== 'string')? msgOrData : data
			});
		}
	});
	return HttpResponder;
}

module.exports = build();
