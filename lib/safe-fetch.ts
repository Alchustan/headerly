const MAX_REDIRECTS = 3;

function isPrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/[\[\]]/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (host === "::1" || host === "0:0:0:0:0:0:0:1" || host === "::") return true;
  if (/^::ffff:(?:\d{1,3}\.){3}\d{1,3}$/.test(host)) return true;
  if (/^\d+$/.test(host) && Number(host) <= 0xffffffff) return true;

  const octets = host.split(".").map(Number);
  if (octets.length === 4 && octets.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)) {
    const [a, b] = octets;
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
  }
  return false;
}

export function normalizePublicUrl(input: string): URL {
  const value = input.trim();
  const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Only HTTP and HTTPS URLs are supported.");
  if (!url.hostname || isPrivateHostname(url.hostname)) throw new Error("Private and local network addresses are not allowed.");
  url.username = "";
  url.password = "";
  return url;
}

export async function fetchPublicUrl(input: string, init: RequestInit = {}): Promise<Response> {
  let url = normalizePublicUrl(input);
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects++) {
    const response = await fetch(url, { ...init, redirect: "manual", signal: init.signal ?? AbortSignal.timeout(10000) });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get("location");
    if (!location || redirects === MAX_REDIRECTS) throw new Error("Too many redirects or invalid redirect target.");
    url = normalizePublicUrl(new URL(location, url).toString());
  }
  throw new Error("Too many redirects.");
}

export async function readBodyWithLimit(response: Response, maxBytes = 5 * 1024 * 1024): Promise<Uint8Array> {
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) { await reader.cancel(); throw new Error("The response is too large to analyze."); }
    chunks.push(value);
  }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}
