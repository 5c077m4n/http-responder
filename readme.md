 HTTP Responder
 ----

A simple and easy way to create and use HTTP errors whilst giving you the control over what is seen.

`const hr = require('http-responder');` => and you're good to go!


To create a custom error: `new hr(statusCode, [options]);`

`statusCode: Number` your error's status code.

`options: Error | {}` the options object may be a nodejs error or include:

	1. `message`: your custom error message.

	2. `data`: whatever data you what to send.


Porperties:
---

	1. `status`: the same as `statusCode` - for compability

	2. `payload`: holds only a pretty version of the error (ie, no stack), to not leak sensitive information

Or, you can create them by the pre-made static functions (`hr.notFound()` for example...):

 Static function list:
 ----

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

`hrbBandwidthLimitExceeded()`,

`hr.notExtended()`,

`hr.networkAuthenticationRequired()`
