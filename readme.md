
HTTP Responder
==================

[![Dependency Tests](https://david-dm.org/5c077m4n/http-responder.svg)](https://david-dm.org/)
[![Greenkeeper badge](https://badges.greenkeeper.io/5c077m4n/http-responder.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/5c077m4n/http-responder.svg?branch=master)](https://travis-ci.org/5c077m4n/http-responder)

A simple and easy way to create and use HTTP errors (extending the original Node.js Error) whilst giving you the control over what is seen. Also, it is traspiled to ECMAScript 2015, so nearly anyone can use it.

Type into your terminal:

```zsh
$ npm install http-responder --save
```

then into your code:

```javascript
const hr = require('http-responder');
```

**and you're good to go!**


To create a custom error: `new hr(statusCode [, optionsOrError]);`

1. `statusCode: number` your error's status code or an error message.

2. `optionsOrError: Error | {}` the options object may be a nodejs error, or include:

	1. `message: string` your custom error message.

	2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy.

Also, you can choose to use: `new hr(message [, options]);`

1. `message: string` your custom error message.

2. `options: {}` the options object may include:

	1. `statusCode: number` the error's status code (you can use `status` instead).

	2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy!

(`new hr();` on its own will give you a 500 status error default.)

Or, you can create them by the pre-made static functions (`hr.notFound()` for example) - a full list below.

And then your imagination is the limit, i.e.: `hr.notFound().end(res);` (in express 4.x).


Porperties:
----

1. `status` the same as 'statusCode' - for backwards compability.

2. `statusDesc` the default description for the given status code.

3. `payload` holds only a pretty version of the error (i.e., no stack), so no sensitive information will be leaked, including:

	* `statusCode` - the original status code.

	* `statusDesc` - the default status description.

	* `message` - the given message.

	* `data` - the given data.

4. All other Node.js's `Error` object properties.


Methods:
----

`appendError(error: Error)` to append an Error to your custom one.

`end(res: Response)` to send the response back to the client (works in express 4.x).


Static functions:
----

`hr.isHR(res)` checks if the res object is of type http-response.

`hr.improve(err)` creates a new HttpResponder based on the `err: Error` param (with a status code of 500 unless different in the err object).


Static response functions:
----

|			Static Function				|		Status Code		|
|---------------------------------------|-----------------------|
|`hr.continue()`						|			100			|
|`hr.switchingProtocols()`				|			101			|
|`hr.processing()`					 	|			102			|
|`hr.earlyHints()`						|			103			|
|`hr.ok()`								|			200			|
|`hr.created()`							|			201			|
|`hr.accepted()`						|			202			|
|`hr.nonAuthoritativeInformation()`		|			203			|
|`hr.noContent()`						|			204			|
|`hr.resetContent()`					|			205			|
|`hr.partialContent()`					|			206			|
|`hr.multiStatus()`						|			207			|
|`hr.alreadyReported()`					|			208			|
|`hr.ImUsed()`							|			226			|
|`hr.multipleChoices()`					|			300			|
|`hr.movedPermanently()`				|			301			|
|`hr.found()`							|			302			|
|`hr.seeOther()`						|			303			|
|`hr.notModified()`						|			304			|
|`hr.useProxy()`						|			305			|
|`hr.switchProxy()`						|			306			|
|`hr.temporaryRedirect()`				|			307			|
|`hr.permanentRedirect()`				|			308			|
|`hr.badRequest()`						|			400			|
|`hr.unauthorized()`					|			401			|
|`hr.paymentRequired()`					|			402			|
|`hr.forbidden()`						|			403			|
|`hr.notFound()`						|			404			|
|`hr.methodNotAllowed()`				|			405			|
|`hr.notAcceptable()`					|			406			|
|`hr.proxyAuthenticationRequired()`		|			407			|
|`hr.requestTimeOut()`					|			408			|
|`hr.conflict()`						|			409			|
|`hr.gone()`							|			410			|
|`hr.lengthRequired()`					|			411			|
|`hr.preconditionFailed()`				|			412			|
|`hr.payloadTooLarge()`					|			413			|
|`hr.uriTooLong()`						|			414			|
|`hr.unsupportedMediaType()`			|			415			|
|`hr.requestedRangeNotSatisfiable()`	|			416			|
|`hr.expectationFailed()`				|			417			|
|`hr.iAmATeapot()`						|			418			|
|`hr.misdirectedRequest()`				|			421			|
|`hr.unprocessableEntity()`				|			422			|
|`hr.locked()`							|			423			|
|`hr.failedDependency()`				|			424			|
|`hr.unorderedCollection()`				|			425			|
|`hr.upgradeRequired()`					|			426			|
|`hr.preconditionRequired()`			|			428			|
|`hr.tooManyRequests()`					|			429			|
|`hr.requestHeaderFieldsTooLarge()`		|			431			|
|`hr.unavailableForLegalReasons()`		|			451			|
|`hr.internalServerError()`				|			500			|
|`hr.notImplemented()`					|			501			|
|`hr.badGateway()`						|			502			|
|`hr.serviceUnavailable()`				|			503			|
|`hr.gatewayTimeOut()`					|			504			|
|`hr.httpVersionNotSupported()`			|			505			|
|`hr.variantAlsoNegotiates()`			|			506			|
|`hr.insufficientStorage()`				|			507			|
|`hr.bandwidthLimitExceeded()`			|			509			|
|`hr.notExtended()`						|			510			|
|`hr.networkAuthenticationRequired()`	|			511			|
