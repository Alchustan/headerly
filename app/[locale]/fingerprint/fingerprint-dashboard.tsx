"use client";

import { useFingerprint } from "@/hooks/use-fingerprint";
import { Clock, Cpu, Laptop, Image, Box, Monitor, Languages, Cookie, ShieldAlert, Touchpad, Maximize, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FingerprintDashboardProps {
  translations: {
    hashLabel: string;
    loading: string;
    uniqueness: {
      title: string;
      description: string;
      low: string;
      medium: string;
      high: string;
    };
    metrics: {
      screen: { title: string; description: string; tooltip: string };
      timezone: { title: string; description: string; tooltip: string };
      hardware: { title: string; description: string; tooltip: string };
      platform: { title: string; description: string; tooltip: string };
      language: { title: string; description: string; tooltip: string };
      cookies: { title: string; description: string; tooltip: string };
      dnt: { title: string; description: string; tooltip: string };
      touch: { title: string; description: string; tooltip: string };
      pixelRatio: { title: string; description: string; tooltip: string };
      canvas: { title: string; description: string; tooltip: string };
      webgl: { title: string; description: string; tooltip: string };
    };
  };
}

export function FingerprintDashboard({ translations }: FingerprintDashboardProps) {
  const { data, hash, score, isLoading } = useFingerprint();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-border bg-card p-8 flex flex-col items-center justify-center space-y-4 shadow-sm transition-all hover:shadow-md">
          <h2 className="text-xl font-semibold text-muted-foreground">{translations.hashLabel}</h2>
          {isLoading ? (
            <div className="text-2xl animate-pulse text-primary">{translations.loading}</div>
          ) : (
            <div className="text-3xl md:text-5xl font-mono text-primary font-bold break-all text-center tracking-tight">
              {hash}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 flex flex-col items-center justify-center space-y-6 shadow-sm transition-all hover:shadow-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">{translations.uniqueness.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{translations.uniqueness.description}</p>
          </div>
          
          <div className="relative flex flex-col items-center mt-2">
            <svg viewBox="0 0 100 55" className="w-56 overflow-visible drop-shadow-sm">
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="10" 
                className="text-muted/50" 
                strokeLinecap="round" 
              />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="10" 
                className="text-primary transition-all duration-1000 ease-out" 
                strokeLinecap="round" 
                strokeDasharray="125.66" 
                strokeDashoffset={125.66 - (125.66 * (isLoading ? 0 : score) / 100)} 
              />
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-4xl font-bold text-foreground">
                {isLoading ? "0" : score}%
              </span>
            </div>
          </div>
          
          <div className="flex justify-between w-full max-w-[240px] text-xs font-semibold text-muted-foreground pt-2">
            <span>{translations.uniqueness.low}</span>
            <span>{translations.uniqueness.high}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={<Monitor className="h-6 w-6" />}
          title={translations.metrics.screen.title}
          description={translations.metrics.screen.description}
          tooltip={translations.metrics.screen.tooltip}
          value={isLoading ? "..." : data?.screenResolution}
        />
        <MetricCard
          icon={<Clock className="h-6 w-6" />}
          title={translations.metrics.timezone.title}
          description={translations.metrics.timezone.description}
          tooltip={translations.metrics.timezone.tooltip}
          value={isLoading ? "..." : data?.timezone}
        />
        <MetricCard
          icon={<Cpu className="h-6 w-6" />}
          title={translations.metrics.hardware.title}
          description={translations.metrics.hardware.description}
          tooltip={translations.metrics.hardware.tooltip}
          value={isLoading ? "..." : `Cores: ${data?.hardwareConcurrency} | RAM: ${data?.deviceMemory}GB`}
        />
        <MetricCard
          icon={<Laptop className="h-6 w-6" />}
          title={translations.metrics.platform.title}
          description={translations.metrics.platform.description}
          tooltip={translations.metrics.platform.tooltip}
          value={isLoading ? "..." : data?.platform}
        />
        <MetricCard
          icon={<Languages className="h-6 w-6" />}
          title={translations.metrics.language.title}
          description={translations.metrics.language.description}
          tooltip={translations.metrics.language.tooltip}
          value={isLoading ? "..." : data?.language}
        />
        <MetricCard
          icon={<Cookie className="h-6 w-6" />}
          title={translations.metrics.cookies.title}
          description={translations.metrics.cookies.description}
          tooltip={translations.metrics.cookies.tooltip}
          value={isLoading ? "..." : data?.cookieEnabled ? "Enabled" : "Disabled"}
        />
        <MetricCard
          icon={<ShieldAlert className="h-6 w-6" />}
          title={translations.metrics.dnt.title}
          description={translations.metrics.dnt.description}
          tooltip={translations.metrics.dnt.tooltip}
          value={isLoading ? "..." : data?.doNotTrack || "Not set"}
        />
        <MetricCard
          icon={<Touchpad className="h-6 w-6" />}
          title={translations.metrics.touch.title}
          description={translations.metrics.touch.description}
          tooltip={translations.metrics.touch.tooltip}
          value={isLoading ? "..." : `${data?.maxTouchPoints} Points`}
        />
        <MetricCard
          icon={<Maximize className="h-6 w-6" />}
          title={translations.metrics.pixelRatio.title}
          description={translations.metrics.pixelRatio.description}
          tooltip={translations.metrics.pixelRatio.tooltip}
          value={isLoading ? "..." : `x${data?.devicePixelRatio}`}
        />
        <MetricCard
          icon={<Image className="h-6 w-6" />}
          title={translations.metrics.canvas.title}
          description={translations.metrics.canvas.description}
          tooltip={translations.metrics.canvas.tooltip}
          value={isLoading ? "..." : data?.canvasHash}
        />
        <MetricCard
          icon={<Box className="h-6 w-6" />}
          title={translations.metrics.webgl.title}
          description={translations.metrics.webgl.description}
          tooltip={translations.metrics.webgl.tooltip}
          value={isLoading ? "..." : `${data?.webglVendor} / ${data?.webglRenderer}`}
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, title, description, tooltip, value }: { icon: React.ReactNode; title: string; description: string; tooltip: string; value?: string | number }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group">
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center cursor-help hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Info className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[250px] p-4 text-sm leading-relaxed rounded-xl shadow-lg border-primary/20">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="pr-10">
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-xl font-mono text-sm break-all text-foreground/80 flex items-center min-h-[3rem]">
        {value}
      </div>
    </div>
  );
}
