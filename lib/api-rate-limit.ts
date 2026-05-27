import { type NextRequest } from "next/server";
import { apiError } from "./api-utils";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "127.0.0.1"
  );
}

export function checkRateLimit(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return apiError("Too many requests. Please try again later.", 429, {
      "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)),
      "X-RateLimit-Limit": String(MAX_REQUESTS),
      "X-RateLimit-Remaining": "0",
      "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
    });
  }

  return null;
}
