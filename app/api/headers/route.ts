import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import { apiResponse, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";

const IMPORTANT_HEADERS = [
  "user-agent",
  "x-forwarded-for",
  "cf-connecting-ip",
  "host",
  "accept-language",
  "referer",
];

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  const headersList = await headers();
  const headersObj = Object.fromEntries(headersList.entries());

  return apiResponse({
    headers: headersObj,
    count: Object.keys(headersObj).length,
    important: IMPORTANT_HEADERS,
  });
}
