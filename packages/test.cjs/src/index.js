const { HttpResponder } = require('http-responder');

console.group('cjs');

console.log(HttpResponder);
const objError = HttpResponder.failedDependency('Error on external API');
console.log('objError', objError);

console.groupEnd('cjs');
