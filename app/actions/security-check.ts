"use server"

import { analyzeSecurityHeaders, type SecurityCheckResult as LibSecurityCheckResult } from "@/lib/security-headers-info";
import { fetchPublicUrl } from "@/lib/safe-fetch";

export type SecurityCheckResult = LibSecurityCheckResult;

export async function checkSecurityHeaders(url: string): Promise<SecurityCheckResult | { error: string }> {
  try {
    const parsedUrl = new URL(/^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`);
    const targetUrl = parsedUrl.toString();
    const domain = parsedUrl.hostname;

    let response = await fetchPublicUrl(targetUrl, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok && response.status >= 400) {
      response = await fetchPublicUrl(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
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

    return {
      url: targetUrl,
      domain,
      ...analysis,
    };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed to check security headers" };
  }
}
