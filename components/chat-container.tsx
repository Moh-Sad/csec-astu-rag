"use client"

import { useState, useRef, useEffect } from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ChatHeader } from "./chat-header"
import { WelcomeScreen } from "./welcome-screen"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Call your RAG backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I apologize, but I could not generate a response.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: "loading",
                    role: "assistant",
                    content: "",
                    timestamp: new Date(),
                    isLoading: true,
                  }}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card">
        <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6">
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
