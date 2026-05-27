import { type NextRequest } from "next/server";
import { corsHeaders } from "@/lib/api-utils";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit) return rateLimit;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Headerly API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #fff; }
    .topbar { display: none; }
    header { border-bottom: 1px solid #e5e4e9; background: rgba(253,252,251,0.95); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 100; }
    header .inner { max-width: 1460px; margin: 0 auto; padding: 0 20px; height: 56px; display: flex; align-items: center; gap: 8px; }
    header a { text-decoration: none; font-size: 14px; }
    header .brand { color: #FF6B6B; font-weight: 700; font-size: 16px; }
    header .brand:hover { color: #FF8E53; }
    header .sep { color: #d0d0d0; font-size: 14px; }
    header .current { color: #645D75; font-weight: 500; }
    .swagger-ui .wrapper { max-width: 1460px; padding: 0 20px; }
    .swagger-ui .info .title { color: #FF6B6B; font-weight: 800; }
    .swagger-ui .info a { color: #FF6B6B; }
    .swagger-ui .info a:hover { color: #FF8E53; }
    .swagger-ui .opblock-tag { font-weight: 600; }
    .swagger-ui .opblock-tag:hover { background: rgba(255,107,107,0.04); }
    .swagger-ui .btn.execute { background: #FF6B6B; border-color: #FF6B6B; }
    .swagger-ui .btn.execute:hover { background: #FF8E53; }
    @media (max-width: 768px) {
      header .inner { padding: 0 16px; }
      .swagger-ui .wrapper { padding: 0 16px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="inner">
      <a href="/" class="brand">Headerly</a>
      <span class="sep">/</span>
      <span class="current">API Docs</span>
    </div>
  </header>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: window.location.origin + '/api/openapi.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset,
      ],
      layout: 'BaseLayout',
      defaultModelsExpandDepth: -1,
      showExtensions: false,
      showCommonExtensions: false,
      filter: true,
      tryItOutEnabled: true,
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      ...corsHeaders(),
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
