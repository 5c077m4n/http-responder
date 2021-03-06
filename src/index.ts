import codeMap from './libs/code-map';
import camelcase from './libs/camelcase';

/**
 * @class HttpResponder - a class containing all static
 * functions that create the responses, with getters and
 * setters.
 */
class HttpResponderBase extends Error {
	private _isHttpRes: boolean;
	statusCode: number;
	data: any;
	static improve(err: Error) {
		return new HttpResponderBase(500, err);
	}
	static isHR(res: any): boolean {
		return res instanceof HttpResponderBase && res._isHttpRes;
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
		} else throw TypeError('The first parameter must be either a number or a string.');
	}

	/** Getters and setters */
	get status(): number {
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

	/** Append new responses to the existing HttpResponse */
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
	log(): void {
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
		(HttpResponderBase as any)[camelcase(value)] = function(msgOrData: string | any, data: any): HttpResponderBase {
			return new HttpResponderBase(key, {
				statusCode: key,
				message: msgOrData && msgOrData.constructor === String && msgOrData.length ? msgOrData : undefined,
				data: msgOrData && msgOrData.constructor !== String ? msgOrData : data,
			});
		};
	});
	return HttpResponderBase;
}

export const HttpResponder = build();
