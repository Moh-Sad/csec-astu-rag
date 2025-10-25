"use client"

import { useState, useEffect } from "react"
import { ChatContainer } from "@/components/chat-container"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <main className="h-screen w-full bg-background text-foreground overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
      <ChatContainer />
    </main>
  )
}
