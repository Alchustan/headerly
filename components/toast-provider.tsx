"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"

export function ToastProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <SonnerToaster
      position="bottom-right"
      theme={resolvedTheme as "light" | "dark" | "system"}
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        },
      }}
    />
  )
}
