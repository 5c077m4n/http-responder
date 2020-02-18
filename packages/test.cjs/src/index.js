const hr = require('http-responder');

console.log(hr);
const objError = hr.failedDependency('Error on external API');
console.log('objError', objError);
