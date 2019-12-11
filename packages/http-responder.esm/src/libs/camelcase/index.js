/**
 * @function camelcase takes a string and returns its camelcased form.
 * @param str: string to transform.
 * @returns a camelcased string.
 */
export default function camelcase(str) {
    let strOut = str.toLowerCase();
    strOut = strOut.replace(/\W([a-z])/g, match => match.toUpperCase());
    strOut = strOut.replace(/\W/gi, '');
    return strOut;
}
