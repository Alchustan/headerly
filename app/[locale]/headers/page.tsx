import { headers } from "next/headers"
import { HeaderCard } from "@/components/header-card"
import { getTranslations } from "next-intl/server"

export default async function HeadersPage() {
    const headersList = await headers()
    const t = await getTranslations("HeadersPage")

    // Convert headers to a plain object
    const headersObj = Object.fromEntries(headersList.entries())

    return (
        <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
            <header className="container mx-auto flex flex-col items-center gap-4 py-12 text-center md:py-20 px-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary lg:text-7xl">
                    {t("title")}
                </h1>
                <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                    {t("description")}
                </p>
            </header>

            <main className="container mx-auto flex-1 px-4 pb-24">
                <HeaderCard headers={headersObj} />
            </main>
        </div>
    )
}