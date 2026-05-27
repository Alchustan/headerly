import { type NextRequest } from "next/server";
import { corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { apiSpec } from "@/lib/api-spec";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  return Response.json(apiSpec, {
    headers: {
      ...corsHeaders(),
      "Content-Type": "application/openapi+json; charset=utf-8",
    },
  });
}
