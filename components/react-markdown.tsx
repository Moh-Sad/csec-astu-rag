"use client"

import type React from "react"

interface ReactMarkdownProps {
  content: string
}

export function ReactMarkdown({ content }: ReactMarkdownProps) {
  // Simple markdown parser for common patterns
  const parseMarkdown = (text: string) => {
    // Split by lines and process
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Headers
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-base font-semibold mt-3 mb-2">
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-lg font-bold mt-4 mb-2">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-xl font-bold mt-4 mb-2">
            {line.substring(2)}
          </h1>,
        )
      }
      // Bold and italic
      else if (line.trim()) {
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/`(.*?)`/g, "<code>$1</code>")

        elements.push(
          <p key={i} className="mb-2">
            {processedLine.split(/(<strong>.*?<\/strong>|<em>.*?<\/em>|<code>.*?<\/code>)/).map((part, idx) => {
              if (part.startsWith("<strong>")) {
                return (
                  <strong key={idx} className="font-semibold">
                    {part.replace(/<\/?strong>/g, "")}
                  </strong>
                )
              } else if (part.startsWith("<em>")) {
                return (
                  <em key={idx} className="italic">
                    {part.replace(/<\/?em>/g, "")}
                  </em>
                )
              } else if (part.startsWith("<code>")) {
                return (
                  <code key={idx} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    {part.replace(/<\/?code>/g, "")}
                  </code>
                )
              }
              return part
            })}
          </p>,
        )
      } else {
        elements.push(<div key={i} className="h-2" />)
      }

      i++
    }

    return elements
  }

  return <div>{parseMarkdown(content)}</div>
}
