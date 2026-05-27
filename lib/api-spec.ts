export const apiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Headerly API",
    version: "1.0.0",
    description:
      "Programmatic access to Headerly's HTTP header inspection, network analysis, security checking, and carbon footprint tools.\n\nAll endpoints return JSON and support CORS. Rate-limited to **30 requests per minute** per IP.",
    contact: {
      name: "Barış Yıldızoğlu",
      url: "https://github.com/Alchustan",
    },
  },
  paths: {
    "/api/headers": {
      get: {
        tags: ["Request Data"],
        summary: "Get request headers",
        description: "Returns all HTTP request headers sent by your browser in the current request, along with a count and a list of important headers.",
        operationId: "getHeaders",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        headers: {
                          type: "object",
                          additionalProperties: { type: "string" },
                          description: "Key-value pairs of all request headers",
                          example: {
                            host: "headerly.net",
                            "user-agent": "Mozilla/5.0 ...",
                            accept: "*/*",
                          },
                        },
                        count: {
                          type: "integer",
                          description: "Number of headers",
                          example: 24,
                        },
                        important: {
                          type: "array",
                          items: { type: "string" },
                          description: "List of commonly important header names",
                          example: ["user-agent", "host", "accept-language"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
    "/api/network": {
      get: {
        tags: ["Request Data"],
        summary: "Get network info",
        description:
          "Returns IP address and geolocation data derived from Cloudflare edge headers. No external APIs or third-party geolocation services are used.",
        operationId: "getNetwork",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        ip: { type: "string", description: "Client IP address", example: "203.0.113.1" },
                        isLocal: { type: "boolean", description: "Whether the IP is a local/loopback address", example: false },
                        geo: {
                          type: "object",
                          nullable: true,
                          description: "Geolocation data (null if not available via Cloudflare headers)",
                          properties: {
                            country: { type: "string", nullable: true, example: "US" },
                            countryCode: { type: "string", nullable: true, example: "US" },
                            city: { type: "string", nullable: true, example: "San Francisco" },
                            region: { type: "string", nullable: true, example: "California" },
                            isp: { type: "string", nullable: true, example: "ASN 13335" },
                            continent: { type: "string", nullable: true, example: "NA" },
                          },
                        },
                        source: { type: "string", example: "Cloudflare Edge Headers" },
                      },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
    "/api/user-agent": {
      get: {
        tags: ["Request Data"],
        summary: "Parse User-Agent",
        description:
          "Parses the User-Agent header from the current request and returns structured details about the browser, operating system, device model, and rendering engine.",
        operationId: "getUserAgent",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        raw: { type: "string", description: "Original User-Agent string", example: "Mozilla/5.0 ..." },
                        browser: {
                          type: "object",
                          properties: {
                            name: { type: "string", nullable: true, example: "Chrome" },
                            version: { type: "string", nullable: true, example: "127.0.0.1" },
                          },
                        },
                        os: {
                          type: "object",
                          properties: {
                            name: { type: "string", nullable: true, example: "macOS" },
                            version: { type: "string", nullable: true, example: "14.5" },
                          },
                        },
                        device: {
                          type: "object",
                          properties: {
                            model: { type: "string", nullable: true, example: null },
                            vendor: { type: "string", nullable: true, example: null },
                            type: { type: "string", nullable: true, example: null },
                          },
                        },
                        engine: {
                          type: "object",
                          properties: {
                            name: { type: "string", nullable: true, example: "Blink" },
                            version: { type: "string", nullable: true, example: "127.0.0.1" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
    "/api/security-check": {
      post: {
        tags: ["Analysis"],
        summary: "Check security headers",
        description:
          "Fetches a URL and analyzes its HTTP security response headers. Returns a letter grade (A–F), a numeric score (0–100), and detailed per-header analysis with recommendations.",
        operationId: "checkSecurity",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["url"],
                properties: {
                  url: {
                    type: "string",
                    format: "uri",
                    description: "The URL to analyze",
                    example: "https://example.com",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        url: { type: "string", example: "https://example.com" },
                        domain: { type: "string", example: "example.com" },
                        grade: {
                          type: "string",
                          enum: ["A", "B", "C", "D", "F"],
                          description: "Overall security grade based on total score",
                          example: "B",
                        },
                        totalScore: {
                          type: "integer",
                          description: "Aggregated security score (0–100)",
                          example: 65,
                        },
                        maxScore: { type: "integer", example: 100 },
                        headers: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string", example: "hsts" },
                              name: { type: "string", example: "Strict-Transport-Security" },
                              score: { type: "integer", example: 20 },
                              maxScore: { type: "integer", example: 20 },
                              status: {
                                type: "string",
                                enum: ["pass", "fail", "missing"],
                              },
                              detail: { type: "string", example: "HSTS enabled (max-age=31536000s)" },
                              recommendation: { type: "string", example: "Set to: max-age=31536000; includeSubDomains" },
                              value: { type: "string", nullable: true, example: "max-age=31536000" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
    "/api/carbon-check": {
      post: {
        tags: ["Analysis"],
        summary: "Check carbon footprint",
        description:
          "Fetches a URL and estimates its carbon footprint per visit based on page size and whether the domain is served by a green hosting provider. Uses The Green Web Foundation API.",
        operationId: "checkCarbon",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["url"],
                properties: {
                  url: {
                    type: "string",
                    format: "uri",
                    description: "The URL to analyze",
                    example: "https://example.com",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        url: { type: "string", example: "https://example.com" },
                        domain: { type: "string", example: "example.com" },
                        sizeMb: {
                          type: "number",
                          description: "Page size in megabytes",
                          example: 1.24,
                        },
                        isGreen: {
                          type: "boolean",
                          description: "Whether the domain is hosted on green energy",
                          example: true,
                        },
                        co2Grams: {
                          type: "number",
                          description: "Estimated CO₂ emissions per visit in grams",
                          example: 0.372,
                        },
                        hostedBy: {
                          type: "string",
                          description: "Hosting provider name",
                          example: "Green Hosting Co",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
    "/api/header-info": {
      get: {
        tags: ["Reference"],
        summary: "Get header knowledge base",
        description:
          "Returns the complete HTTP header documentation database with descriptions and MDN reference links. Covers 30+ common request and response headers.",
        operationId: "getHeaderInfo",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        count: { type: "integer", example: 30 },
                        headers: {
                          type: "object",
                          additionalProperties: {
                            type: "object",
                            properties: {
                              description: { type: "string", example: "The Accept request header advertises which content types..." },
                              mdnUrl: { type: "string", nullable: true, example: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "429": { $ref: "#/components/responses/RateLimit" },
        },
      },
    },
  },
  components: {
    responses: {
      RateLimit: {
        description: "Rate limit exceeded",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { type: "string", example: "Too many requests. Please try again later." },
              },
            },
          },
        },
        headers: {
          "Retry-After": {
            schema: { type: "integer" },
            description: "Seconds to wait before retrying",
          },
          "X-RateLimit-Limit": {
            schema: { type: "integer", example: 30 },
            description: "Max requests per window",
          },
          "X-RateLimit-Remaining": {
            schema: { type: "integer", example: 0 },
            description: "Requests remaining in current window",
          },
        },
      },
      BadRequest: {
        description: "Invalid request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { type: "string", example: "Missing or invalid 'url' field in request body" },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    { name: "Request Data", description: "Endpoints that inspect the current HTTP request" },
    { name: "Analysis", description: "Endpoints that analyze external URLs" },
    { name: "Reference", description: "Reference data about HTTP headers" },
  ],
};
