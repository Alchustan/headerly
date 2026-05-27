import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";
import { apiResponse, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  const headersList = await headers();
  const headersObj = Object.fromEntries(headersList.entries());

  const uaString = headersObj["user-agent"] || "";
  const parser = new UAParser(uaString);
  const result = parser.getResult();

  return apiResponse({
    raw: uaString,
    browser: {
      name: result.browser.name || null,
      version: result.browser.version || null,
    },
    os: {
      name: result.os.name || null,
      version: result.os.version || null,
    },
    device: {
      model: result.device.model || null,
      vendor: result.device.vendor || null,
      type: result.device.type || null,
    },
    engine: {
      name: result.engine.name || null,
      version: result.engine.version || null,
    },
  });
}
