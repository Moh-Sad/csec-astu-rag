"use client"

import { Button } from "@/components/ui/button"
import { SunIcon } from "./icons/sun-icon"
import { MoonIcon } from "./icons/moon-icon"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="none"
      size="icon"
      className="rounded-lg border border-border bg-card text-foreground"
    >
      {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </Button>
  )
}
