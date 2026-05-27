import { type NextRequest } from "next/server";
import { apiResponse, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { HEADER_DESCRIPTIONS } from "@/lib/header-info";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  return apiResponse({
    count: Object.keys(HEADER_DESCRIPTIONS).length,
    headers: HEADER_DESCRIPTIONS,
  });
}
