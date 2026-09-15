"use client"

import * as React from "react"

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SmoothScrollLink({ href, children, className }: SmoothScrollLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return

    const target = document.querySelector(href)
    if (!target) return

    event.preventDefault()
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
    window.history.replaceState(null, "", href)
  }

  return <a href={href} onClick={handleClick} className={className}>{children}</a>
}
