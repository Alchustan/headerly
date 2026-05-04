import { MapPin, Server, Activity } from "lucide-react"

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
    <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm p-6 max-w-6xl mx-auto transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Activity className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground">Network & Location Info</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Server className="h-4 w-4" /> IP Address
          </span>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            {geoData.query || "Unknown"}
          </span>
        </div>

        {!isLocal ? (
          <>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </span>
              <span className="text-lg font-semibold text-foreground tracking-tight">
                {[geoData.city, geoData.regionName, geoData.country].filter(Boolean).join(", ")}
                {geoData.countryCode && ` (${geoData.countryCode})`}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" /> ISP / Provider
              </span>
              <span className="text-lg font-semibold text-foreground tracking-tight truncate" title={geoData.isp}>
                {geoData.isp || "Unknown Provider"}
              </span>
            </div>
          </>
        ) : (
          <div className="md:col-span-2 flex items-center">
            <span className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded-lg border border-border/50">
              Localhost or Private Network - Geolocation unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
