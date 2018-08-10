HTTP Responder
----

A simple and easy way to create and use HTTP errors (extending the original node.js Error) whilst giving you the control over what is seen.

`const hr = require('http-responder');` => and you're good to go!

To create a custom error: `new hr(statusCode [, optionsOrError]);`

1. `statusCode: number` your error's status code or an error message.

2. `optionsOrError: Error | {}` the options object may be a nodejs error, or include:

	1. `message` your custom error message.

	2. `data` whatever data you what to send (also shows up in the payload property) - has to be truthy.

Also, you can choose to use: `new hr(message [, options]);`

1. `message` your custom error message.

2. `options: {}` the options object may include:

	1. `statusCode: number` the error's status code.

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

`hr.isHR(err)`: checks if the err object is of type http-response.

Static error functions:
---

`hr.continue()`,

`hr.switchingProtocols()`,

`hr.processing()`,

`hr.ok()`,

`hr.created()`,

`hr.accepted()`,

`hr.nonAuthoritativeInformation()`,

`hr.noContent()`,

`hr.resetContent()`,

`hr.partialContent()`,

`hr.multiStatus()`,

`hr.multipleChoices()`,

`hr.movedPermanently()`,

`hr.movedTemporarily()`,

`hr.seeOther()`,

`hr.notModified()`,

`hr.useProxy()`,

`hr.temporaryRedirect()`,

`hr.badRequest()`,

`hr.unauthorized()`,

`hr.paymentRequired()`,

`hr.forbidden()`,

`hr.notFound()`,

`hr.methodNotAllowed()`,

`hr.notAcceptable()`,

`hr.proxyAuthenticationRequired()`,

`hr.requestTimeOut()`,

`hr.conflict()`,

`hr.gone()`,

`hr.lengthRequired()`,

`hr.preconditionFailed()`,

`hr.requestEntityTooLarge()`,

`hr.requestUriTooLarge()`,

`hr.unsupportedMediaType()`,

`hr.requestedRangeNotSatisfiable()`,

`hr.expectationFailed()`,

`hr.iAmATeapot()`,

`hr.unprocessableEntity()`,

`hr.locked()`,

`hr.failedDependency()`,

`hr.unorderedCollection()`,

`hr.upgradeRequired()`,

`hr.preconditionRequired()`,

`hr.tooManyRequests()`,

`hr.requestHeaderFieldsTooLarge()`,

`hr.unavailableForLegalReasons()`,

`hr.internalServerError()`,

`hr.notImplemented()`,

`hr.badGateway()`,

`hr.serviceUnavailable()`,

`hr.gatewayTimeOut()`,

`hr.httpVersionNotSupported()`,

`hr.variantAlsoNegotiates()`,

`hr.insufficientStorage()`,

`hr.bandwidthLimitExceeded()`,

`hr.notExtended()`,

`hr.networkAuthenticationRequired()`
