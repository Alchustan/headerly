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

export function NetworkInfoCards({ geoData }: { geoData: GeoData | null }) {
  if (!geoData) return null

  const isLocal = geoData.status === "fail" || geoData.query === "127.0.0.1" || geoData.query === "::1"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* IP Card */}
      <InfoCard 
        icon={<Server className="h-5 w-5" />}
        label="Public IP Address"
        value={geoData.query || "Unknown"}
        description="Your unique internet identifier"
      />

      {!isLocal ? (
        <>
          <InfoCard 
            icon={<MapPin className="h-5 w-5" />}
            label="Physical Location"
            value={`${geoData.city || "Unknown City"}, ${geoData.country || ""}`}
            subValue={geoData.countryCode ? `(${geoData.countryCode})` : undefined}
            description="Detected origin of your connection"
          />
          <InfoCard 
            icon={<Building2 className="h-5 w-5" />}
            label="Service Provider"
            value={geoData.isp || "Unknown Provider"}
            description="Your internet service provider (ISP)"
          />
          <InfoCard 
            icon={<LocateFixed className="h-5 w-5" />}
            label="Region"
            value={geoData.regionName || "Not detected"}
            description="State or province level location"
          />
          <InfoCard 
            icon={<Activity className="h-5 w-5" />}
            label="Organization"
            value={geoData.org || "Individual User"}
            description="Network owner or organization"
          />
        </>
      ) : (
        <div className="lg:col-span-2 flex items-center p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">Local Environment Detected</p>
              <p className="text-muted-foreground mt-1 leading-relaxed">
                You are accessing Headerly from a local or private network. Geolocation data is only available for public IP ranges.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoCard({ 
  icon, 
  label, 
  value, 
  subValue, 
  description 
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  subValue?: string,
  description: string 
}) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-foreground tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-sm font-medium text-muted-foreground">
              {subValue}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}


