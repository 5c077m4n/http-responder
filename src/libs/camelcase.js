/**
 * @function camelcase takes a string and returns its camelcased form.
 * @param str: string to transform.
 */
module.exports = function (str) {
	let strOut = str.toLowerCase();
	strOut = strOut.replace(/\s([a-z])/g, match => match.toUpperCase());
	strOut = strOut.replace(/\s/gi, '');
	return strOut;
};
