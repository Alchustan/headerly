import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Headerly - HTTP Request Header Inspector",
  description: "Instantly view and inspect your HTTP request headers. A modern, privacy-focused developer tool for debugging browser-server communication.",
  keywords: ["http headers", "request headers", "developer tools", "debugging", "browser headers", "inspect headers", "headerly"],
  authors: [{ name: "Barış Yıldızoğlu", url: "https://github.com/Alchustan" }],
  creator: "Barış Yıldızoğlu",
  openGraph: {
    title: "Headerly - HTTP Request Header Inspector",
    description: "Instantly view and inspect your HTTP request headers. A modern, privacy-focused developer tool.",
    url: "https://headerly.net",
    siteName: "Headerly",
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Headerly - HTTP Request Header Inspector",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headerly - HTTP Request Header Inspector",
    description: "Instantly view and inspect your HTTP request headers. A modern, privacy-focused developer tool.",
    images: ["/screenshot.png"],
    creator: "@alchustan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://headerly.net"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", fontSans.variable, fontMono.variable)}>
      <body className={cn(fontSans.className, "min-h-screen bg-background text-foreground")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
