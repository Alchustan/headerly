"use server"

export type CarbonCheckResult = {
  url: string;
  domain: string;
  sizeMb: number;
  isGreen: boolean;
  co2Grams: number;
  hostedBy: string;
};
import { fetchPublicUrl, readBodyWithLimit } from "@/lib/safe-fetch";

export async function checkCarbonFootprint(url: string): Promise<CarbonCheckResult | { error: string }> {
  try {
    const parsedUrl = new URL(/^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`);
    const targetUrl = parsedUrl.toString();
    const domain = parsedUrl.hostname;

    // Fetch URL to get Content-Length or body size
    const response = await fetchPublicUrl(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    let sizeMb = 0;
    const contentLength = response.headers.get('content-length');
    
    if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) <= 5 * 1024 * 1024) {
      sizeMb = parseInt(contentLength, 10) / (1024 * 1024);
    } else {
      sizeMb = (await readBodyWithLimit(response)).byteLength / (1024 * 1024);
    }

    // Call Green Web Foundation API
    const greenResponse = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`);
    const greenData = await greenResponse.json();

    const isGreen = greenData.green;
    const hostedBy = greenData.hostedby || "Unknown Provider";

    // Calculate CO2
    const multiplier = isGreen ? 0.3 : 0.5;
    const co2Grams = sizeMb * multiplier;

    return {
      url: targetUrl,
      domain,
      sizeMb,
      isGreen,
      co2Grams,
      hostedBy
    };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed to check carbon footprint" };
  }
}
