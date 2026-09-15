import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return generatePageMetadata(locale, "Metadata.terms", "/terms") }

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const t = await getTranslations("TermsPage"); const turkish = locale === "tr"
  const sections = turkish ? [
    ["Hizmetin kapsamı", "Headerly, HTTP başlıkları, ağ metadatası, User-Agent, güvenlik başlıkları ve web aktarım boyutu hakkında yardımcı bilgiler sunan ücretsiz bir araçtır."],
    ["Bilgilerin sınırları", "Sonuçlar mevcut isteğe, hedef sitenin yanıtına ve kullanılan analiz yöntemine bağlıdır. IP konumu ve User-Agent yorumları yaklaşık olabilir; güvenlik ve karbon sonuçları tam kapsamlı denetim değildir."],
    ["URL analizleri", "Bir URL göndererek Headerly'nin bu adrese analiz amacıyla istek göndermesini kabul etmiş olursunuz. Yalnızca analiz etmeye yetkili olduğunuz siteleri kullanın ve hedef sitenin kullanım koşullarına uyun."],
    ["Kabul edilebilir kullanım", "Hizmeti kötüye kullanmamalı, başkalarının sistemlerine zarar verecek, aşırı yük oluşturacak veya yetkisiz veri toplamaya yönelik işlemler yapmamalısınız."],
    ["Hizmet değişiklikleri", "Hizmet ve bu şartlar, gerektiğinde önceden bildirim yapılmaksızın güncellenebilir. Güncel metin bu sayfada yayımlanır."],
  ] : [
    ["Service Description", "Headerly provides free tools for viewing HTTP request information and analyzing selected public URLs."],
    ["Disclaimer", "Results are provided as is. Headerly does not guarantee uninterrupted service or the accuracy and timeliness of analysis results."],
    ["Rules of Use", "Users must not misuse the service, damage systems, cause excessive load, or perform unauthorized analysis."],
    ["Changes", "These terms may be updated without prior notice. The current version is published on this page."],
  ]
  return <div className="relative flex flex-1 flex-col bg-background"><header className="container mx-auto flex flex-col items-center gap-4 px-4 py-12 text-center md:py-20"><Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" />{t("back")}</Link><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">{t("title")}</h1><p className="max-w-[600px] text-muted-foreground md:text-xl">{t("lastUpdated")}: {new Date().toLocaleDateString(turkish ? "tr-TR" : "en-US", { month: "long", day: "numeric", year: "numeric" })}</p></header><main className="container mx-auto max-w-3xl flex-1 px-4 pb-20"><p className="mb-12 text-lg leading-relaxed text-foreground/90">{turkish ? "Headerly'yi kullanarak aşağıdaki kapsam ve sınırlamaları kabul etmiş olursunuz." : "By using Headerly, you acknowledge the following scope and limitations."}</p><div className="space-y-10 text-muted-foreground">{sections.map(([title, body]) => <section key={title}><h2 className="mb-3 text-2xl font-bold text-primary">{title}</h2><p className="leading-relaxed">{body}</p></section>)}</div></main></div>
}
