"use client"

import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface JsonViewProps {
  data: Record<string, any>
}

export function JsonView({ data }: JsonViewProps) {
  const { theme } = useTheme()
  const jsonString = JSON.stringify(data, null, 2)
  
  const prismTheme = theme === "light" ? themes.github : themes.vsDark

  return (
    <Highlight
      theme={prismTheme}
      code={jsonString}
      language="json"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre 
          className={cn(className, "min-w-fit")} 
          style={{ 
            ...style, 
            backgroundColor: "transparent", 
            padding: "0",
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: "1.7",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex hover:bg-primary/5 transition-colors group">
              <span className="inline-block w-10 shrink-0 select-none text-right text-[10px] font-mono text-muted-foreground/50 pr-4 pt-0.5 group-hover:text-primary/60 transition-colors">
                {i + 1}
              </span>
              <span className="whitespace-pre pr-8">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
