import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "../globals.css"
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
 
  return {
    title: t('title'),
    description: t('description'),
    keywords: ["http headers", "request headers", "developer tools", "debugging", "browser headers", "inspect headers", "headerly"],
    authors: [{ name: "Barış Yıldızoğlu", url: "https://github.com/Alchustan" }],
    creator: "Barış Yıldızoğlu",
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "https://headerly.net",
      siteName: "Headerly",
      images: [
        {
          url: "/screenshot.png",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
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
  };
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={cn("antialiased", fontSans.variable, fontMono.variable)}>
      <body className={cn(fontSans.className, "min-h-screen bg-background text-foreground flex flex-col")}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <TooltipProvider>
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
