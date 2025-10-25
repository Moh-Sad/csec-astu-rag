import { type NextRequest, NextResponse } from "next/server"

// This is a template route handler for your RAG backend integration
// Replace the fetch URL with your actual RAG backend endpoint

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    // TODO: Replace with your actual RAG backend endpoint
    const RAG_BACKEND_URL = process.env.NEXT_PUBLIC_RAG_BACKEND_URL || "http://localhost:8000"

    const response = await fetch(`${RAG_BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
        conversation_history: conversationHistory,
      }),
    })

    if (!response.ok) {
      throw new Error(`RAG backend error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      answer: data.answer || data.response || "No response generated",
      sources: data.sources || [],
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
