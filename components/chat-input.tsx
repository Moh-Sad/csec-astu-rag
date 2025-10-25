"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SendIcon } from "./icons/send-icon"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about CSEC ASTU..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all max-h-32 text-sm sm:text-base"
          rows={1}
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg p-2 sm:p-3 h-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
        Press <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground text-xs">Shift + Enter</kbd> for new line
      </p>
    </form>
  )
}
