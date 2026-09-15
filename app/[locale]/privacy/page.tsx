import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generatePageMetadata(locale, "Metadata.privacy", "/privacy")
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations("PrivacyPage")
  const lastUpdated = new Date().toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", { month: "long", day: "numeric", year: "numeric" })
  const turkish = locale === "tr"
  const sections = turkish ? [
    ["İşlenen bilgiler", "Headerly, isteğinize yanıt verebilmek için IP adresi, User-Agent ve HTTP başlıkları gibi teknik bilgileri geçici olarak işler. Bu bilgiler, bir kullanıcı profili oluşturmak amacıyla kullanılmaz."],
    ["URL analizleri", "Güvenlik ve Yeşil Web araçlarına bir URL gönderdiğinizde Headerly, sonucu üretebilmek için bu adrese sunucu tarafından istek gönderir. URL içeriği kalıcı bir geçmişe eklenmez; hedef sitenin kendi log politikası bu işlemin dışındadır."],
    ["Saklama ve loglar", "Headerly sonuçları kalıcı olarak saklamamayı amaçlar. Bununla birlikte hosting, CDN veya ağ sağlayıcıları güvenlik ve işletim amacıyla standart erişim logları tutabilir. Bu loglar Headerly'nin doğrudan kontrolünde değildir."],
    ["Çerezler ve üçüncü taraflar", "Headerly'nin uygulama davranışı için zorunlu olmayan takip çerezleri kullandığı varsayılmamalıdır. Tema ve dil tercihlerinin nasıl saklandığı kullanılan tarayıcı ve altyapıya bağlı olabilir. Yeşil Web kontrolünde alan adı, ilgili harici serviste sorgulanır."],
    ["Sınırlar", "IP adresi, yaklaşık konum veya User-Agent tek başına bir kişiyi kesin olarak tanımlamaz. Buradaki açıklamalar teknik görünürlüğü anlamanıza yardımcı olur; hukuki veya güvenlik garantisi değildir."],
  ] : [
    ["Data Collected", "This site may temporarily process IP address and browser information contained in the HTTP request to respond to the request."],
    ["Server Logs", "The hosting provider may retain standard server logs for security and performance. These records are outside the direct control of Headerly."],
    ["Third-Party Services", "URL analysis tools may send the submitted domain to the service required to produce the requested result."],
    ["Updates", "This policy may be updated from time to time. The latest version is published on this page."],
  ]

  return <div className="relative flex flex-1 flex-col bg-background">
    <header className="container mx-auto flex flex-col items-center gap-4 px-4 py-12 text-center md:py-20">
      <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" />{t("back")}</Link>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">{t("title")}</h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("lastUpdated")}: {lastUpdated}</p>
    </header>
    <main className="container mx-auto max-w-3xl flex-1 px-4 pb-20">
      <p className="mb-12 text-lg leading-relaxed text-foreground/90">{turkish ? "Bu sayfa Headerly'nin hangi teknik bilgileri işlediğini ve bu işlemin sınırlarını açıklar." : "This page explains how technical request information may be processed by Headerly."}</p>
      <div className="space-y-10 text-muted-foreground">{sections.map(([title, body]) => <section key={title}><h2 className="mb-3 text-2xl font-bold text-primary">{title}</h2><p className="leading-relaxed">{body}</p></section>)}</div>
    </main>
  </div>
}
