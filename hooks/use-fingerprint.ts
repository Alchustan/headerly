"use client";

import { useState, useEffect } from "react";

export interface FingerprintData {
  screenResolution: string;
  timezone: string;
  hardwareConcurrency: number | string;
  deviceMemory: number | string;
  platform: string;
  language: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  maxTouchPoints: number;
  devicePixelRatio: number;
  canvasHash: string;
  webglVendor: string;
  webglRenderer: string;
}

const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

const getCanvasFingerprint = (): string => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "Not Supported";
    
    canvas.width = 200;
    canvas.height = 50;
    
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    
    ctx.fillStyle = "#069";
    ctx.fillText("Fingerprint, \ud83d\ude03", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Fingerprint, \ud83d\ude03", 4, 17);
    
    const dataUrl = canvas.toDataURL();
    return simpleHash(dataUrl);
  } catch (e) {
    return "Error";
  }
};

const getWebglFingerprint = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return { vendor: "Not Supported", renderer: "Not Supported" };

    const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return { vendor: "No Debug Info", renderer: "No Debug Info" };

    const vendor = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    return { vendor, renderer };
  } catch (e) {
    return { vendor: "Error", renderer: "Error" };
  }
};

export const useFingerprint = () => {
  const [data, setData] = useState<FingerprintData | null>(null);
  const [hash, setHash] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const screenResolution = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const hardwareConcurrency = navigator.hardwareConcurrency || "Unknown";
      const deviceMemory = (navigator as any).deviceMemory || "Unknown";
      const platform = (navigator as any).userAgentData?.platform || navigator.platform || "Unknown";
      const language = navigator.language || (navigator as any).userLanguage || "Unknown";
      const cookieEnabled = navigator.cookieEnabled;
      const doNotTrack = navigator.doNotTrack;
      const maxTouchPoints = navigator.maxTouchPoints || 0;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      const canvasHash = getCanvasFingerprint();
      const webgl = getWebglFingerprint();
      
      const fingerprintData: FingerprintData = {
        screenResolution,
        timezone,
        hardwareConcurrency,
        deviceMemory,
        platform,
        language,
        cookieEnabled,
        doNotTrack,
        maxTouchPoints,
        devicePixelRatio,
        canvasHash,
        webglVendor: webgl.vendor,
        webglRenderer: webgl.renderer,
      };

      let entropyScore = 0;
      if (screenResolution !== "Unknown" && screenResolution !== "") entropyScore += 10;
      if (timezone !== "Unknown" && timezone !== "") entropyScore += 10;
      if (hardwareConcurrency !== "Unknown") entropyScore += 10;
      if (deviceMemory !== "Unknown") entropyScore += 10;
      if (platform !== "Unknown" && platform !== "") entropyScore += 10;
      if (language !== "Unknown" && language !== "") entropyScore += 10;
      if (canvasHash !== "Error" && canvasHash !== "Not Supported") entropyScore += 20;
      if (webgl.vendor !== "Error" && webgl.vendor !== "Not Supported" && webgl.vendor !== "No Debug Info") entropyScore += 20;

      setData(fingerprintData);
      setScore(Math.min(entropyScore, 99)); // Max 99% to imply nothing is ever 100% perfectly unique
      
      const combinedString = Object.values(fingerprintData).join("||");
      
      // Attempt SHA-256, fallback to simple hash
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(combinedString))
        .then(hashBuffer => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          setHash(hashHex);
          setIsLoading(false);
        })
        .catch(() => {
          setHash(simpleHash(combinedString));
          setIsLoading(false);
        });
        
    } catch (e) {
      setIsLoading(false);
    }
  }, []);

  return { data, hash, score, isLoading };
};
