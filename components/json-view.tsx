"use client"

import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { useTheme } from "next-themes"

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
        <pre className={className} style={{ ...style, backgroundColor: "transparent", padding: "1.5rem" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              <span className="table-cell select-none pr-4 text-right opacity-30 text-xs w-8">
                {i + 1}
              </span>
              <span className="table-cell">
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
