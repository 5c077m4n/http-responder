/**
 * @function camelcase takes a string and returns its camelcased form.
 * @param str: string to transform.
 * @returns a camelcased string.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function camelcase(str) {
        let strOut = str.toLowerCase();
        strOut = strOut.replace(/\W([a-z])/g, match => match.toUpperCase());
        strOut = strOut.replace(/\W/gi, '');
        return strOut;
    }
    exports.default = camelcase;
});
