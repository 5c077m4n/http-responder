var e=new Map([[100,"Continue"],[101,"Switching Protocols"],[102,"Processing"],[103,"Early Hints"],[200,"OK"],[201,"Created"],[202,"Accepted"],[203,"Non-Authoritative Information"],[204,"No Content"],[205,"Reset Content"],[206,"Partial Content"],[207,"Multi-Status"],[208,"Already Reported"],[226,"IM Used"],[300,"Multiple Choices"],[301,"Moved Permanently"],[302,"Found"],[303,"See Other"],[304,"Not Modified"],[305,"Use Proxy"],[306,"Switch Proxy"],[307,"Temporary Redirect"],[308,"Permanent Redirect"],[400,"Bad Request"],[401,"Unauthorized"],[402,"Payment Required"],[403,"Forbidden"],[404,"Not Found"],[405,"Method Not Allowed"],[406,"Not Acceptable"],[407,"Proxy Authentication Required"],[408,"Request Time-out"],[409,"Conflict"],[410,"Gone"],[411,"Length Required"],[412,"Precondition Failed"],[413,"Payload Too Large"],[414,"URI Too Long"],[415,"Unsupported Media Type"],[416,"Requested Range Not Satisfiable"],[417,"Expectation Failed"],[418,"I Am A Teapot"],[421,"Misdirected Request"],[422,"Unprocessable Entity"],[423,"Locked"],[424,"Failed Dependency"],[425,"Unordered Collection"],[426,"Upgrade Required"],[428,"Precondition Required"],[429,"Too Many Requests"],[431,"Request Header Fields Too Large"],[451,"Unavailable For Legal Reasons"],[499,"Client Closed Request"],[500,"Internal Server Error"],[501,"Not Implemented"],[502,"Bad Gateway"],[503,"Service Unavailable"],[504,"Gateway Time-out"],[505,"HTTP Version Not Supported"],[506,"Variant Also Negotiates"],[507,"Insufficient Storage"],[509,"Bandwidth Limit Exceeded"],[510,"Not Extended"],[511,"Network Authentication Required"],[598,"Network Read Timeout Error"],[599,"Network Connect Timeout Error"]]);class t extends Error{constructor(e=500,t={}){if(super(),Object.assign(this,t),this._isHttpRes=!0,"number"==typeof e)this.statusCode=e,this.message=t.message?t.message:void 0;else{if("string"!=typeof e)throw TypeError("The first parameter must be either a number or a string.");this.message=e,this.statusCode=t.statusCode||t.status||500}}static improve(e){return new t(500,e)}static isHR(e){return e instanceof t&&e._isHttpRes}get status(){return this.statusCode}set status(e){this.statusCode=e}get statusDesc(){var t;return null!==(t=e.get(this.statusCode))&&void 0!==t?t:"Unknown Status Code"}get statusText(){return this.statusDesc}get body(){return this.data}set body(e){this.data=e}get payload(){return{statusCode:this.statusCode,statusDesc:this.statusDesc,message:this.message&&this.message.length?this.message:void 0,data:this.data?this.data:void 0,log:()=>console.log(JSON.stringify(this.payload))}}set payload(e){throw new Error("This property is read-only.")}appendError(e){return Object.assign(this,e)}end(e){return e.status(this.statusCode).json(this.payload)}send(e){return this.end(e)}json(e){return this.end(e)}log(){console.log(JSON.stringify(this))}}const s=(e.forEach((e,s)=>{t[function(e){let t=e.toLowerCase();return t=t.replace(/\W([a-z])/g,e=>e.toUpperCase()),t=t.replace(/\W/gi,""),t}(e)]=function(e,o){return new t(s,{statusCode:s,message:e&&e.constructor===String&&e.length?e:void 0,data:e&&e.constructor!==String?e:o})}}),t);export{s as HttpResponder};