export interface SecurityHeaderInfo {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  check: (value: string | null) => { score: number; status: "pass" | "fail" | "missing"; detail: string };
  recommendation: string;
  mdnUrl: string;
}

function hstsCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "Header is not set" };
  const lower = value.toLowerCase();
  const match = lower.match(/max-age=(\d+)/);
  if (!match) return { score: 5, status: "fail" as const, detail: "HSTS is set but missing max-age directive" };
  const maxAge = parseInt(match[1], 10);
  if (maxAge >= 31536000 && lower.includes("includesubdomains")) {
    return { score: 20, status: "pass" as const, detail: `HSTS enabled (max-age=${maxAge}s, includeSubDomains)` };
  }
  if (maxAge >= 31536000) {
    return { score: 15, status: "pass" as const, detail: `HSTS enabled (max-age=${maxAge}s) — includeSubDomains recommended` };
  }
  return { score: 10, status: "fail" as const, detail: `HSTS max-age (${maxAge}s) is too short (minimum 1 year recommended)` };
}

function cspCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "Content-Security-Policy is not set" };
  const lower = value.toLowerCase();
  let score = 25;
  const issues: string[] = [];
  if (lower.includes("unsafe-inline")) { score -= 10; issues.push("uses unsafe-inline"); }
  if (lower.includes("unsafe-eval")) { score -= 5; issues.push("uses unsafe-eval"); }
  if (lower.includes("*")) { score -= 5; issues.push("uses wildcard (*)"); }
  if (!lower.includes("default-src") && !lower.includes("script-src")) { score -= 5; issues.push("no default-src or script-src restriction"); }
  const status = score >= 20 ? "pass" as const : "fail" as const;
  return {
    score: Math.max(0, score),
    status,
    detail: issues.length > 0 ? `CSP present but ${issues.join(", ")}` : "CSP is properly configured",
  };
}

function xfoCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "X-Frame-Options is not set" };
  const lower = value.toLowerCase();
  if (lower === "deny") return { score: 15, status: "pass" as const, detail: "X-Frame-Options: DENY" };
  if (lower === "sameorigin") return { score: 12, status: "pass" as const, detail: "X-Frame-Options: SAMEORIGIN" };
  return { score: 5, status: "fail" as const, detail: `X-Frame-Options: ${value} — use DENY or SAMEORIGIN` };
}

function xctoCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "X-Content-Type-Options is not set" };
  if (value.toLowerCase() === "nosniff") return { score: 10, status: "pass" as const, detail: "X-Content-Type-Options: nosniff" };
  return { score: 5, status: "fail" as const, detail: `X-Content-Type-Options: ${value} — use nosniff` };
}

function rpCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "Referrer-Policy is not set" };
  const lower = value.toLowerCase();
  const safe = ["strict-origin-when-cross-origin", "same-origin", "no-referrer", "no-referrer-when-downgrade", "strict-origin"];
  if (safe.includes(lower)) return { score: 10, status: "pass" as const, detail: `Referrer-Policy: ${value}` };
  if (lower === "unsafe-url" || lower === "origin-when-cross-origin") return { score: 3, status: "fail" as const, detail: `Referrer-Policy: ${value} — leaks URL information` };
  return { score: 5, status: "fail" as const, detail: `Referrer-Policy: ${value} — consider a stricter policy` };
}

function ppCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "Permissions-Policy is not set" };
  const score = value.toLowerCase().includes("*") ? 5 : 10;
  const status = score >= 10 ? "pass" as const : "fail" as const;
  return { score, status, detail: `Permissions-Policy is ${value.toLowerCase().includes("*") ? "set but uses wildcard" : "configured"}` };
}

function cookieCheck(value: string | null) {
  if (!value) return { score: 0, status: "missing" as const, detail: "No Set-Cookie header" };
  const lower = value.toLowerCase();
  let score = 10;
  const flags: string[] = [];
  if (!lower.includes("secure")) { score -= 4; flags.push("missing Secure"); }
  if (!lower.includes("httponly")) { score -= 3; flags.push("missing HttpOnly"); }
  if (!lower.includes("samesite")) { score -= 3; flags.push("missing SameSite"); }
  if (flags.length === 0) return { score: 10, status: "pass" as const, detail: "Cookies are secure (Secure + HttpOnly + SameSite)" };
  return { score: Math.max(0, score), status: "fail" as const, detail: `Cookie issues: ${flags.join(", ")}` };
}

export const SECURITY_HEADERS: SecurityHeaderInfo[] = [
  {
    id: "hsts",
    name: "Strict-Transport-Security",
    description: "Forces browsers to always connect via HTTPS, preventing SSL stripping and man-in-the-middle attacks.",
    maxScore: 20,
    check: hstsCheck,
    recommendation: "Set to: max-age=31536000; includeSubDomains",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security",
  },
  {
    id: "csp",
    name: "Content-Security-Policy",
    description: "Prevents XSS and data injection attacks by controlling which resources the browser can load.",
    maxScore: 25,
    check: cspCheck,
    recommendation: "Restrict script sources, avoid unsafe-inline and unsafe-eval",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy",
  },
  {
    id: "xfo",
    name: "X-Frame-Options",
    description: "Prevents clickjacking by controlling whether the page can be embedded in iframes.",
    maxScore: 15,
    check: xfoCheck,
    recommendation: "Set to: DENY",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
  },
  {
    id: "xcto",
    name: "X-Content-Type-Options",
    description: "Prevents MIME type sniffing, reducing the risk of malicious file uploads and drive-by downloads.",
    maxScore: 10,
    check: xctoCheck,
    recommendation: "Set to: nosniff",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options",
  },
  {
    id: "rp",
    name: "Referrer-Policy",
    description: "Controls how much referrer information is sent with requests, protecting user privacy.",
    maxScore: 10,
    check: rpCheck,
    recommendation: "Set to: strict-origin-when-cross-origin",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy",
  },
  {
    id: "pp",
    name: "Permissions-Policy",
    description: "Controls which browser features (camera, microphone, geolocation) the page and its iframes can use.",
    maxScore: 10,
    check: ppCheck,
    recommendation: "Restrict feature access explicitly, avoid wildcards",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy",
  },
  {
    id: "cookie",
    name: "Set-Cookie",
    description: "Ensures cookies are transmitted securely with the Secure, HttpOnly, and SameSite flags.",
    maxScore: 10,
    check: cookieCheck,
    recommendation: "Set Secure, HttpOnly, and SameSite=Lax/Strict on all cookies",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie",
  },
];

export type SecurityCheckResult = {
  url: string;
  domain: string;
  totalScore: number;
  maxScore: number;
  headers: Array<{
    id: string;
    name: string;
    description: string;
    maxScore: number;
    score: number;
    status: "pass" | "fail" | "missing";
    detail: string;
    recommendation: string;
    mdnUrl: string;
    value: string | null;
  }>;
};

export const MAX_SECURITY_SCORE = SECURITY_HEADERS.reduce((sum, h) => sum + h.maxScore, 0);

export function analyzeSecurityHeaders(
  responseHeaders: Record<string, string>,
): Omit<SecurityCheckResult, "url" | "domain"> {
  const results = SECURITY_HEADERS.map((header) => {
    const rawValue = responseHeaders[header.name.toLowerCase()] || null;
    const { score, status, detail } = header.check(rawValue);
    return {
      id: header.id,
      name: header.name,
      description: header.description,
      maxScore: header.maxScore,
      score,
      status,
      detail,
      recommendation: header.recommendation,
      mdnUrl: header.mdnUrl,
      value: rawValue,
    };
  });

  const totalScore = results.reduce((sum, h) => sum + h.score, 0);

  return { totalScore, maxScore: MAX_SECURITY_SCORE, headers: results };
}
