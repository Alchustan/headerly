export interface HeaderInfo {
  description: string;
  mdnUrl?: string;
}

export const HEADER_DESCRIPTIONS: Record<string, HeaderInfo> = {
  "accept": {
    description: "The Accept request header advertises which content types, expressed as MIME types, the client is able to understand.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept"
  },
  "accept-encoding": {
    description: "The Accept-Encoding request header advertises which content encoding, usually a compression algorithm, the client is able to understand.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding"
  },
  "accept-language": {
    description: "The Accept-Language request header advertises which languages the client is able to understand, and which locale variant is preferred.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language"
  },
  "authorization": {
    description: "The HTTP Authorization request header contains the credentials to authenticate a user agent with a server.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization"
  },
  "cache-control": {
    description: "The Cache-Control HTTP header field holds directives (instructions) for caching in both requests and responses.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control"
  },
  "cf-connecting-ip": {
    description: "A Cloudflare-specific header that identifies the original client IP address of a request passing through the Cloudflare network.",
  },
  "cf-ray": {
    description: "A Cloudflare-specific header. A unique identifier for every request that passes through Cloudflare, used for troubleshooting.",
  },
  "connection": {
    description: "The Connection general header controls whether the network connection stays open after the current transaction finishes.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection"
  },
  "content-length": {
    description: "The Content-Length header indicates the size of the message body, in bytes, sent to the recipient.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length"
  },
  "content-type": {
    description: "The Content-Type representation header is used to indicate the original MIME type of the resource.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"
  },
  "cookie": {
    description: "The Cookie HTTP request header contains stored HTTP cookies previously sent by the server with the Set-Cookie header.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie"
  },
  "dnt": {
    description: "The DNT (Do Not Track) request header indicates the user's tracking preference. It lets users opt out of tracking by websites.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT"
  },
  "host": {
    description: "The Host request header specifies the host name and port number of the server to which the request is being sent.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host"
  },
  "if-none-match": {
    description: "The If-None-Match HTTP request header makes the request conditional. For GET and HEAD methods, the server will return the requested resource only if it doesn't have an ETag matching the given ones.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match"
  },
  "origin": {
    description: "The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin"
  },
  "priority": {
    description: "The Priority request header is used to indicate the relative priority of a request, used by browsers to optimize resource loading.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Priority"
  },
  "referer": {
    description: "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer"
  },
  "sec-ch-ua": {
    description: "The Sec-CH-UA header provides the user agent's branding and version information via Client Hints.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA"
  },
  "sec-ch-ua-mobile": {
    description: "The Sec-CH-UA-Mobile header indicates if the user agent is on a mobile device.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile"
  },
  "sec-ch-ua-platform": {
    description: "The Sec-CH-UA-Platform header indicates the platform or operating system on which the user agent is running.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform"
  },
  "sec-fetch-dest": {
    description: "The Sec-Fetch-Dest fetch metadata header indicates the request's destination.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Dest"
  },
  "sec-fetch-mode": {
    description: "The Sec-Fetch-Mode fetch metadata header indicates the mode of the request.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Mode"
  },
  "sec-fetch-site": {
    description: "The Sec-Fetch-Site fetch metadata header indicates the relationship between a request initiator's origin and the target resource's origin.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site"
  },
  "sec-fetch-user": {
    description: "The Sec-Fetch-User fetch metadata header indicates whether a navigation request was triggered by user activation.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-User"
  },
  "upgrade-insecure-requests": {
    description: "The Upgrade-Insecure-Requests request header sends a signal to the server expressing the client's preference for an encrypted and authenticated response.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade-Insecure-Requests"
  },
  "user-agent": {
    description: "The User-Agent request header is a characteristic string that lets servers and network peers identify the application, operating system, vendor, and/or version of the requesting user agent.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent"
  },
  "x-forwarded-for": {
    description: "The X-Forwarded-For (XFF) request header is a de-facto standard header for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or a load balancer.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For"
  },
  "x-forwarded-host": {
    description: "The X-Forwarded-Host request header is a de-facto standard header for identifying the original host requested by the client in the Host HTTP request header.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host"
  },
  "x-forwarded-proto": {
    description: "The X-Forwarded-Proto request header is a de-facto standard header for identifying the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer.",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto"
  },
  "x-real-ip": {
    description: "A common de-facto standard header used by proxies and load balancers to pass the original client's IP address to the application server.",
  },
};

export function getHeaderInfo(name: string): HeaderInfo {
  return HEADER_DESCRIPTIONS[name.toLowerCase()] || {
    description: "No detailed description available for this header.",
  };
}
