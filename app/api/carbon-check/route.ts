import { type NextRequest } from "next/server";
import { apiResponse, apiError, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body");
  }

  if (!body.url || typeof body.url !== "string") {
    return apiError("Missing or invalid 'url' field in request body");
  }

  let targetUrl = body.url;
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return apiError("Invalid URL");
  }

  const domain = parsedUrl.hostname;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      signal: AbortSignal.timeout(10000),
    });

    let sizeMb = 0;
    const contentLength = response.headers.get("content-length");
    if (contentLength) {
      sizeMb = parseInt(contentLength, 10) / (1024 * 1024);
    } else {
      const text = await response.text();
      sizeMb = new Blob([text]).size / (1024 * 1024);
    }

    const greenResponse = await fetch(
      `https://api.thegreenwebfoundation.org/greencheck/${domain}`
    );
    const greenData = await greenResponse.json();

    const isGreen = greenData.green;
    const hostedBy = greenData.hostedby || "Unknown Provider";

    const multiplier = isGreen ? 0.3 : 0.5;
    const co2Grams = sizeMb * multiplier;

    return apiResponse({
      url: targetUrl,
      domain,
      sizeMb: Math.round(sizeMb * 100) / 100,
      isGreen,
      co2Grams: Math.round(co2Grams * 1000) / 1000,
      hostedBy,
    });
  } catch (error: unknown) {
    return apiError(
      error instanceof Error ? error.message : "Failed to check carbon footprint"
    );
  }
}
