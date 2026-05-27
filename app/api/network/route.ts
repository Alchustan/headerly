import { headers } from "next/headers";
import { type NextRequest } from "next/server";
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

  const ip =
    headersObj["cf-connecting-ip"] ||
    headersObj["x-forwarded-for"]?.split(",")[0]?.trim() ||
    headersObj["x-real-ip"] ||
    "127.0.0.1";

  const isLocal = ip === "127.0.0.1" || ip === "::1" || ip === "localhost";

  let geo: Record<string, string | null> | null = null;

  if (headersObj["cf-ipcountry"]) {
    geo = {
      country: headersObj["cf-ipcountry"],
      countryCode: headersObj["cf-ipcountry"],
      city: headersObj["cf-ipcity"] || null,
      region: headersObj["cf-region-name"] || headersObj["cf-region"] || null,
      isp: headersObj["cf-ipasn"] ? `ASN ${headersObj["cf-ipasn"]}` : null,
      continent: headersObj["cf-ipcontinent"] || null,
    };
  }

  return apiResponse({
    ip,
    isLocal,
    geo,
    source: "Cloudflare Edge Headers",
    note: "Geolocation data is derived from Cloudflare request headers only. No external APIs are used.",
  });
}
