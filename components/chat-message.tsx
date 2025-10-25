"use client"

import type { Message } from "./chat-container"
import { LoadingDots } from "./loading-dots"
import { ReactMarkdown } from "./react-markdown"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`w-full sm:max-w-xl md:max-w-2xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none ml-auto"
            : "bg-card border border-border text-foreground rounded-bl-none mr-auto"
        }`}
      >
        {message.isLoading ? (
          <LoadingDots />
        ) : (
          <div className="leading-relaxed break-words">
            <ReactMarkdown content={message.content} />
          </div>
        )}
      </div>
    </div>
  )
}
