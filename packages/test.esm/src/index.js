import { HttpResponder } from 'http-responder';

console.group('esm');

console.log(HttpResponder);
const objError = HttpResponder.failedDependency('Error on external API');
console.log('objError', objError);

console.groupEnd('esm');
