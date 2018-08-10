 HTTP Responder
 ----

A simple and easy way to create and use HTTP errors whilst giving you the control over what is seen.

`const hr = require('http-responder');` => and you're good to go!


To create a custom error:
`new hr(atatusCode, [options]);`

`atatusCode: Number` your error's status code.

`oprions: {} | Error` the options object may be a nodejs error or include:
message: your custom error message.
