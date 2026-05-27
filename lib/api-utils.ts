import { NextResponse } from "next/server";

export function apiResponse(data: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json({ success: true, data }, { status, headers: { ...corsHeaders(), ...extraHeaders } });
}

export function apiError(error: string, status = 400, extraHeaders?: Record<string, string>) {
  return NextResponse.json({ success: false, error }, { status, headers: { ...corsHeaders(), ...extraHeaders } });
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
