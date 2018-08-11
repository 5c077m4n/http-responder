HTTP Responder
----

A simple and easy way to create and use HTTP errors (extending the original node.js Error) whilst giving you the control over what is seen.

`const hr = require('http-responder');` => and you're good to go!

To create a custom error: `new hr(statusCode [, optionsOrError]);`

1. `statusCode: number` your error's status code or an error message.

2. `optionsOrError: Error | {}` the options object may be a nodejs error, or include:

	1. `message: string` your custom error message.

	2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy.

Also, you can choose to use: `new hr(message [, options]);`

1. `message: string` your custom error message.

2. `options: {}` the options object may include:

	1. `statusCode: number` the error's status code (you can use `status` instead).

	2. `data: any` whatever data you what to send (also shows up in the payload property) - has to be truthy.

(`new hr();` will give you a 500 status error default.)


Porperties:
----

1. `status`: the same as 'statusCode' - for compability.

2. `payload`: holds only a pretty version of the error (ie, no stack), so no sensitive information will be leaked.

3. `isRespError: boolean`: a boolean saying if the object is of type HttpResponder.

Or, you can create them by the pre-made static functions (`hr.notFound()` for example).


Methods:
----

to append an Error to your custom one: `appendError(error: Error)`.


Static functions:
----

`hr.isHR(err)` checks if the err object is of type http-response.

`hr.improve(err)` creates a new HttpResponder based on the `err: Error` param (default statusCode is 500).


Static response functions:
---

`hr.continue()` (statusCode: 100),

`hr.switchingProtocols()` (statusCode: 101),

`hr.processing()` (statusCode: 102),

`hr.ok()` (statusCode: 200),

`hr.created()` (statusCode: 201),

`hr.accepted()` (statusCode: 202),

`hr.nonAuthoritativeInformation()` (statusCode: 203),

`hr.noContent()` (statusCode: 204),

`hr.resetContent()` (statusCode: 205),

`hr.partialContent()` (statusCode: 206),

`hr.multiStatus()` (statusCode: 207),

`hr.multipleChoices()` (statusCode: 300),

`hr.movedPermanently()` (statusCode: 301),

`hr.movedTemporarily()` (statusCode: 302),

`hr.seeOther()` (statusCode: 303),

`hr.notModified()` (statusCode: 304),

`hr.useProxy()` (statusCode: 305),

`hr.temporaryRedirect()` (statusCode: 307),

`hr.badRequest()` (statusCode: 400),

`hr.unauthorized()` (statusCode: 401),

`hr.paymentRequired()` (statusCode: 402),

`hr.forbidden()` (statusCode: 403),

`hr.notFound()` (statusCode: 404),

`hr.methodNotAllowed()` (statusCode: 405),

`hr.notAcceptable()` (statusCode: 406),

`hr.proxyAuthenticationRequired()` (statusCode: 407),

`hr.requestTimeOut()` (statusCode: 408),

`hr.conflict()` (statusCode: 409),

`hr.gone()` (statusCode: 410),

`hr.lengthRequired()` (statusCode: 411),

`hr.preconditionFailed()` (statusCode: 412),

`hr.requestEntityTooLarge()` (statusCode: 413),

`hr.requestUriTooLarge()` (statusCode: 414),

`hr.unsupportedMediaType()` (statusCode: 415),

`hr.requestedRangeNotSatisfiable()` (statusCode: 416),

`hr.expectationFailed()` (statusCode: 417),

`hr.iAmATeapot()` (statusCode: 418),

`hr.unprocessableEntity()` (statusCode: 422),

`hr.locked()` (statusCode: 423),

`hr.failedDependency()` (statusCode: 424),

`hr.unorderedCollection()` (statusCode: 425),

`hr.upgradeRequired()` (statusCode: 426),

`hr.preconditionRequired()` (statusCode: 428),

`hr.tooManyRequests()` (statusCode: 429),

`hr.requestHeaderFieldsTooLarge()` (statusCode: 431),

`hr.unavailableForLegalReasons()` (statusCode: 451),

`hr.internalServerError()` (statusCode: 500),

`hr.notImplemented()` (statusCode: 501),

`hr.badGateway()` (statusCode: 502),

`hr.serviceUnavailable()` (statusCode: 503),

`hr.gatewayTimeOut()` (statusCode: 504),

`hr.httpVersionNotSupported()` (statusCode: 505),

`hr.variantAlsoNegotiates()` (statusCode: 506),

`hr.insufficientStorage()` (statusCode: 507),

`hr.bandwidthLimitExceeded()` (statusCode: 509),

`hr.notExtended()` (statusCode: 510),

`hr.networkAuthenticationRequired()` (statusCode: 511)
