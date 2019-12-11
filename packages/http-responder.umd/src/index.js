var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./libs/camelcase", "./libs/code-map"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const camelcase_1 = __importDefault(require("./libs/camelcase"));
    const code_map_1 = __importDefault(require("./libs/code-map"));
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
            if (typeof statusCodeOrMessage === 'number') {
                this.statusCode = statusCodeOrMessage;
                this.message = errorOrOptions.message ? errorOrOptions.message : undefined;
            }
            else if (typeof statusCodeOrMessage === 'string') {
                this.message = statusCodeOrMessage;
                this.statusCode = errorOrOptions.statusCode || errorOrOptions.status || 500;
            }
            else
                throw new Error('The first parameter must be either a number or a string.');
        }
        static improve(err) {
            return new HttpResponder(500, err);
        }
        static isHR(res) {
            //@ts-ignore
            return res.constructor === HttpResponder && res._isHttpRes;
        }
        /** Getters and setters */
        get status() {
            return this.statusCode;
        }
        set status(code) {
            this.statusCode = code;
        }
        get statusDesc() {
            var _a;
            return _a = code_map_1.default.get(this.statusCode), (_a !== null && _a !== void 0 ? _a : 'Unknown Status Code');
        }
        get statusText() {
            return this.statusDesc;
        }
        get body() {
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
        appendError(err) {
            return Object.assign(this, err);
        }
        /** Return a response to the client (express 4.x) */
        end(res) {
            return res.status(this.statusCode).json(this.payload);
        }
        send(res) {
            return this.end(res);
        }
        json(res) {
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
        code_map_1.default.forEach((value, key) => {
            //@ts-ignore
            HttpResponder[camelcase_1.default(value)] = function (msgOrData, data) {
                return new HttpResponder(key, {
                    statusCode: key,
                    message: msgOrData && msgOrData.constructor === String && msgOrData.length ? msgOrData : undefined,
                    data: msgOrData && msgOrData.constructor !== String ? msgOrData : data,
                });
            };
        });
        return HttpResponder;
    }
    exports.default = build();
});
