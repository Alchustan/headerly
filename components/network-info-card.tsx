import { MapPin, Server, Activity, Globe, Building2, LocateFixed } from "lucide-react"

export interface GeoData {
  status: string
  country?: string
  countryCode?: string
  regionName?: string
  city?: string
  isp?: string
  org?: string
  query: string
}

export function NetworkInfoCard({ geoData }: { geoData: GeoData | null }) {
  if (!geoData) return null

  const isLocal = geoData.status === "fail" || geoData.query === "127.0.0.1" || geoData.query === "::1"

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card shadow-lg p-8 max-w-6xl mx-auto transition-all hover:shadow-xl dark:shadow-none overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Network Analysis</h2>
          <p className="text-sm text-muted-foreground">Detailed connection profile and origin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Server className="h-3.5 w-3.5" /> Public IP Address
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-mono font-bold text-foreground tracking-tight">
              {geoData.query || "Unknown"}
            </span>
          </div>
        </div>

        {!isLocal ? (
          <>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Physical Location
              </span>
              <span className="text-xl font-bold text-foreground tracking-tight">
                {[geoData.city, geoData.country].filter(Boolean).join(", ")}
                {geoData.countryCode && (
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    ({geoData.countryCode})
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" /> Service Provider
              </span>
              <span className="text-xl font-bold text-foreground tracking-tight truncate" title={geoData.isp}>
                {geoData.isp || "Unknown Provider"}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <LocateFixed className="h-3.5 w-3.5" /> Region
              </span>
              <span className="text-xl font-bold text-foreground tracking-tight">
                {geoData.regionName || "Not detected"}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="h-3.5 w-3.5" /> Organization
              </span>
              <span className="text-xl font-bold text-foreground tracking-tight truncate" title={geoData.org}>
                {geoData.org || "Individual User"}
              </span>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2 flex items-center p-6 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-foreground">Local Environment Detected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You are accessing Headerly from a local or private network. Geolocation data is not available for private IP ranges.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

