# HTTP Responder

[![Greenkeeper badge](https://badges.greenkeeper.io/5c077m4n/http-responder.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/5c077m4n/http-responder.svg?branch=master)](https://travis-ci.org/5c077m4n/http-responder)
[![Known Vulnerabilities](https://snyk.io/test/github/5c077m4n/http-responder/badge.svg)](https://snyk.io/test/github/5c077m4n/http-responder)
[![Coverage Status](https://coveralls.io/repos/github/5c077m4n/http-responder/badge.svg?branch=master)](https://coveralls.io/github/5c077m4n/http-responder?branch=master)

A simple and easy way to create and use HTTP errors (extending the original Node.js Error) whilst giving you the control over what is seen.

All you need to do is type into your terminal:

```bash
$ npm install --save http-responder
```

then into your code:

```javascript
const { HttpResponder } = require('http-responder');
```

or:

```javascript
import { HttpResponder } from 'http-responder';
```

**and you're good to go!**

To create a custom error: `new HttpResponder(statusCode [, optionsOrError]);`

1. `statusCode: number` your error's status code or an error message.

2. `optionsOrError: Error | {}` the options object may be a nodejs error, or include:

    1. `message: string` your custom error message.

    2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy.

Also, you can choose to use: `new HttpResponder(message [, options]);`

1. `message: string` your custom error message.

2. `options: {}` the options object may include:

    1. `statusCode: number` the error's status code (you can use `status` instead)

    2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy!

(`new HttpResponder();` on its own will give you a 500 status error default.)

Or, you can create them by the pre-made static functions (`HttpResponder.notFound()`, for example, for code 404) - a full list below.

And then, your imagination is the limit, i.e.: `HttpResponder.notFound().end(res);` (only in express 4.x).

## Properties:

1. `status | statusCode` the error's status code.

2. `statusDesc | statusText` the default description for the given status code (readonly).

3. `data | body` the included data.

4. `payload` holds only a pretty version of the error (i.e., no stack), so no sensitive information will be leaked, including:

    - `statusCode` - the original status code.

    - `statusDesc` - the default status description.

    - `message` - the given message.

    - `data` - the given data.

    - `log()` - a function to console.log the payload - for testing.

5. All other Node.js's `Error` object properties.

## Methods:

`appendError(error: Error)` to append an Error to your custom one.

`end(res: Response)` (or `send()` or `json()` for compability) to send the response payload back to the client (works in express 4.x).

`log()` to console.log you object - for testing.

### Static methods:

`HttpResponder.isHR(res)` checks if the res object is of type HttpResponder.

`HttpResponder.improve(err)` returns a new HttpResponder based on the `err: Error` param (with a status code of 500 unless different in the err object).

### Static response methods:

Each function here is used in the same manner: `HttpResponder.<functionName>(message: string | undefined, data: any);` or `HttpResponder.<functionName>(data: any);` (in the latter data cannot be of type string - otherwise the data will be inserted into the message param).

**A Reminder**: when using `HttpResponder.noContent(data).end(res);` express removes all fields from the response and returns only the status code (204)! So neither the data nor the default description will be returned.

| Static Function                                 | Status Code |
| :---------------------------------------------- | ----------: |
| `HttpResponder.continue()`                      |         100 |
| `HttpResponder.switchingProtocols()`            |         101 |
| `HttpResponder.processing()`                    |         102 |
| `HttpResponder.earlyHints()`                    |         103 |
| `HttpResponder.ok()`                            |         200 |
| `HttpResponder.created()`                       |         201 |
| `HttpResponder.accepted()`                      |         202 |
| `HttpResponder.nonAuthoritativeInformation()`   |         203 |
| `HttpResponder.noContent()`                     |         204 |
| `HttpResponder.resetContent()`                  |         205 |
| `HttpResponder.partialContent()`                |         206 |
| `HttpResponder.multiStatus()`                   |         207 |
| `HttpResponder.alreadyReported()`               |         208 |
| `HttpResponder.ImUsed()`                        |         226 |
| `HttpResponder.multipleChoices()`               |         300 |
| `HttpResponder.movedPermanently()`              |         301 |
| `HttpResponder.found()`                         |         302 |
| `HttpResponder.seeOther()`                      |         303 |
| `HttpResponder.notModified()`                   |         304 |
| `HttpResponder.useProxy()`                      |         305 |
| `HttpResponder.switchProxy()`                   |         306 |
| `HttpResponder.temporaryRedirect()`             |         307 |
| `HttpResponder.permanentRedirect()`             |         308 |
| `HttpResponder.badRequest()`                    |         400 |
| `HttpResponder.unauthorized()`                  |         401 |
| `HttpResponder.paymentRequired()`               |         402 |
| `HttpResponder.forbidden()`                     |         403 |
| `HttpResponder.notFound()`                      |         404 |
| `HttpResponder.methodNotAllowed()`              |         405 |
| `HttpResponder.notAcceptable()`                 |         406 |
| `HttpResponder.proxyAuthenticationRequired()`   |         407 |
| `HttpResponder.requestTimeOut()`                |         408 |
| `HttpResponder.conflict()`                      |         409 |
| `HttpResponder.gone()`                          |         410 |
| `HttpResponder.lengthRequired()`                |         411 |
| `HttpResponder.preconditionFailed()`            |         412 |
| `HttpResponder.payloadTooLarge()`               |         413 |
| `HttpResponder.uriTooLong()`                    |         414 |
| `HttpResponder.unsupportedMediaType()`          |         415 |
| `HttpResponder.requestedRangeNotSatisfiable()`  |         416 |
| `HttpResponder.expectationFailed()`             |         417 |
| `HttpResponder.iAmATeapot()`                    |         418 |
| `HttpResponder.misdirectedRequest()`            |         421 |
| `HttpResponder.unprocessableEntity()`           |         422 |
| `HttpResponder.locked()`                        |         423 |
| `HttpResponder.failedDependency()`              |         424 |
| `HttpResponder.unorderedCollection()`           |         425 |
| `HttpResponder.upgradeRequired()`               |         426 |
| `HttpResponder.preconditionRequired()`          |         428 |
| `HttpResponder.tooManyRequests()`               |         429 |
| `HttpResponder.requestHeaderFieldsTooLarge()`   |         431 |
| `HttpResponder.unavailableForLegalReasons()`    |         451 |
| `HttpResponder.clientClosedRequest()`           |         499 |
| `HttpResponder.internalServerError()`           |         500 |
| `HttpResponder.notImplemented()`                |         501 |
| `HttpResponder.badGateway()`                    |         502 |
| `HttpResponder.serviceUnavailable()`            |         503 |
| `HttpResponder.gatewayTimeOut()`                |         504 |
| `HttpResponder.httpVersionNotSupported()`       |         505 |
| `HttpResponder.variantAlsoNegotiates()`         |         506 |
| `HttpResponder.insufficientStorage()`           |         507 |
| `HttpResponder.bandwidthLimitExceeded()`        |         509 |
| `HttpResponder.notExtended()`                   |         510 |
| `HttpResponder.networkAuthenticationRequired()` |         511 |
| `HttpResponder.networkReadTimeoutError()`       |         598 |
| `HttpResponder.networkConnectTimeoutError()`    |         599 |

**Happy responding! ;)**
