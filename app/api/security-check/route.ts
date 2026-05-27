import { type NextRequest } from "next/server";
import { apiResponse, apiError, corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { analyzeSecurityHeaders } from "@/lib/security-headers-info";

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
    let response = await fetch(targetUrl, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok && response.status >= 400) {
      response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
    }

    const rawHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (rawHeaders[lower]) {
        rawHeaders[lower] += ", " + value;
      } else {
        rawHeaders[lower] = value;
      }
    });

    const analysis = analyzeSecurityHeaders(rawHeaders);

    const grade =
      analysis.totalScore >= 80 ? "A" :
      analysis.totalScore >= 60 ? "B" :
      analysis.totalScore >= 40 ? "C" :
      analysis.totalScore >= 20 ? "D" : "F";

    return apiResponse({
      url: targetUrl,
      domain,
      grade,
      ...analysis,
    });
  } catch (error: unknown) {
    return apiError(
      error instanceof Error ? error.message : "Failed to check security headers"
    );
  }
}
