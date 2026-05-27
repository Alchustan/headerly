import { type NextRequest } from "next/server";
import { apiResponse, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  return apiResponse({
    name: "Headerly API",
    version: "1.0.0",
    description: "Programmatic access to Headerly's HTTP header inspection and web analysis tools.",
    baseUrl: "https://headerly.net/api",
    documentation: "https://headerly.net/api/docs",
    rateLimiting: "30 requests per minute per IP",
    endpoints: {
      headers: {
        method: "GET",
        path: "/api/headers",
        description: "Returns HTTP request headers from the current request.",
      },
      network: {
        method: "GET",
        path: "/api/network",
        description: "Returns IP address and geolocation data derived from Cloudflare edge headers.",
      },
      userAgent: {
        method: "GET",
        path: "/api/user-agent",
        description: "Parses the User-Agent header and returns browser, OS, device, and engine details.",
      },
      securityCheck: {
        method: "POST",
        path: "/api/security-check",
        description: "Analyzes a URL's HTTP security response headers and returns a security score (0-100).",
        body: { url: "string (the URL to analyze)" },
      },
      carbonCheck: {
        method: "POST",
        path: "/api/carbon-check",
        description: "Estimates the carbon footprint of a webpage by checking page size and green hosting status.",
        body: { url: "string (the URL to analyze)" },
      },
      headerInfo: {
        method: "GET",
        path: "/api/header-info",
        description: "Returns the HTTP header documentation database with descriptions and MDN links.",
      },
    },
  });
}
