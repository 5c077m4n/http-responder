"use strict";const camelCase=require("camelcase"),chalk=require("chalk"),codeMap=new Map([[100,`Continue`],[101,`Switching Protocols`],[102,`Processing`],[103,"Early Hints"],[200,`OK`],[201,`Created`],[202,`Accepted`],[203,`Non-Authoritative Information`],[204,`No Content`],[205,`Reset Content`],[206,`Partial Content`],[207,`Multi-Status`],[208,`Already Reported`],[226,`IM Used`],[300,`Multiple Choices`],[301,`Moved Permanently`],[302,`Found`],[303,`See Other`],[304,`Not Modified`],[305,`Use Proxy`],[306,`Switch Proxy`],[307,`Temporary Redirect`],[308,`Permanent Redirect`],[400,`Bad Request`],[401,`Unauthorized`],[402,`Payment Required`],[403,`Forbidden`],[404,`Not Found`],[405,`Method Not Allowed`],[406,`Not Acceptable`],[407,`Proxy Authentication Required`],[408,`Request Time-out`],[409,`Conflict`],[410,`Gone`],[411,`Length Required`],[412,`Precondition Failed`],[413,`Payload Too Large`],[414,`URI Too Long`],[415,`Unsupported Media Type`],[416,`Requested Range Not Satisfiable`],[417,`Expectation Failed`],[418,`I Am A Teapot`],[421,`Misdirected Request`],[422,`Unprocessable Entity`],[423,`Locked`],[424,`Failed Dependency`],[425,`Unordered Collection`],[426,`Upgrade Required`],[428,`Precondition Required`],[429,`Too Many Requests`],[431,`Request Header Fields Too Large`],[451,`Unavailable For Legal Reasons`],[500,`Internal Server Error`],[501,`Not Implemented`],[502,`Bad Gateway`],[503,`Service Unavailable`],[504,`Gateway Time-out`],[505,`HTTP Version Not Supported`],[506,`Variant Also Negotiates`],[507,`Insufficient Storage`],[509,`Bandwidth Limit Exceeded`],[510,`Not Extended`],[511,`Network Authentication Required`]]);class HttpResponder extends Error{constructor(a=500,b={}){if(super(),Object.assign(this,b),this._isHttpRes=!0,"number"==typeof a)this.statusCode=a,this.message=b.message?b.message:void 0;else if("string"==typeof a)this.message=a,this.statusCode=b.statusCode||b.status||500;else throw new Error("The first parameter must be either a number or a string.")}get status(){return this.statusCode}set status(a){return this.statusCode=a,a}get statusDesc(){return codeMap.has(this.statusCode)?codeMap.get(this.statusCode):"Unknown Status Code"}set statusDesc(a){throw new Error("This property is read-only.")}get payload(){return{statusCode:this.statusCode,statusDesc:this.statusDesc,message:this.message?this.message:void 0,data:this.data?this.data:void 0}}set payload(a){throw new Error("This property is read-only.")}appendError(a){return Object.assign(this,a)}end(a){return a.status(this.statusCode).json(this.payload)}log(){return console.log(chalk.bgBlack.blueBright(JSON.stringify(this)))}logPayload(){return console.log(chalk.bgBlack.cyanBright(JSON.stringify(this.payload)))}static improve(a){return new HttpResponder(500,a)}static isHR(a){return a instanceof HttpResponder&&a._isHttpRes}}function build(){return codeMap.forEach((a,b)=>{HttpResponder[camelCase(a)]=function(a,c){return new HttpResponder(b,{statusCode:b,message:a,data:c})}}),HttpResponder}module.exports=build();