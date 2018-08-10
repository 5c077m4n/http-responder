 HTTP Responder
 ----

A simple and easy way to create and use HTTP errors whilst giving you the control over what is seen.

`const hr = require('http-responder');` => and you're good to go!


To create a custom error: `new hr(statusCode, [options]);`

`statusCode: Number` your error's status code.

`options: Error | {}` the options object may be a nodejs error or include:

	1. `message`: your custom error message.

	2. `data`: whatever data you what to send.



Or, you can create them by the pre-made static functions (`hr.notFound()` for example...)
