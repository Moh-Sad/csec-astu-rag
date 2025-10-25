"use client"

import { useState, useEffect } from "react"
import { ChatContainer } from "@/components/chat-container"

export default function Home() {
  return (
    <main className="h-screen w-full bg-background text-foreground overflow-hidden">
      <ChatContainer />
    </main>
  )
}
