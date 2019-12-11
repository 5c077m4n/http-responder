import camelcase from './libs/camelcase';
import codeMap from './libs/code-map';

/**
 * @class HttpResponder - a class containing all static
 * functions that create the responses, with getters and
 * setters.
 */
class HttpResponder extends Error {
	private _isHttpRes: boolean;
	statusCode: number;
	data: any;
	static improve(err: Error) {
		return new HttpResponder(500, err);
	}
	static isHR(res: Error) {
		//@ts-ignore
		return res.constructor === HttpResponder && res._isHttpRes;
	}

	constructor(statusCodeOrMessage: number | string = 500, errorOrOptions: Error | any = {}) {
		super();

		Object.assign(this, errorOrOptions);
		this._isHttpRes = true;
		if (typeof statusCodeOrMessage === 'number') {
			this.statusCode = statusCodeOrMessage;
			this.message = errorOrOptions.message ? errorOrOptions.message : undefined;
		} else if (typeof statusCodeOrMessage === 'string') {
			this.message = statusCodeOrMessage;
			this.statusCode = errorOrOptions.statusCode || errorOrOptions.status || 500;
		} else throw new Error('The first parameter must be either a number or a string.');
	}

	/** Getters and setters */
	get status() {
		return this.statusCode;
	}
	set status(code: number) {
		this.statusCode = code;
	}
	get statusDesc(): string {
		return codeMap.get(this.statusCode) ?? 'Unknown Status Code';
	}
	get statusText(): string {
		return this.statusDesc;
	}
	get body(): any {
		return this.data;
	}
	set body(data) {
		this.data = data;
	}
	get payload() {
		return {
			statusCode: this.statusCode,
			statusDesc: this.statusDesc,
			message: this.message && this.message.length ? this.message : undefined,
			data: this.data ? this.data : undefined,
			log: () => console.log(JSON.stringify(this.payload)),
		};
	}
	set payload(_) {
		throw new Error('This property is read-only.');
	}

	/** Append new responses to the exisisting HttpResponse */
	appendError(err: Error | any) {
		return Object.assign(this, err);
	}
	/** Return a response to the client (express 4.x) */
	end(res: Error | any) {
		return res.status(this.statusCode).json(this.payload);
	}
	send(res: Error | any) {
		return this.end(res);
	}
	json(res: Error | any) {
		return this.end(res);
	}
	log() {
		console.log(JSON.stringify(this));
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
		//@ts-ignore
		HttpResponder[camelcase(value)] = function(msgOrData: string | any, data: any): HttpResponder {
			return new HttpResponder(key, {
				statusCode: key,
				message: msgOrData && msgOrData.constructor === String && msgOrData.length ? msgOrData : undefined,
				data: msgOrData && msgOrData.constructor !== String ? msgOrData : data,
			});
		};
	});
	return HttpResponder;
}

export default build();
