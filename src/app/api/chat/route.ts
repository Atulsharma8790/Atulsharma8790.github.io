import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '../../../lib/knowledge'
import { saveUnansweredQuestion, trackAnalytics, categoriseQuestion } from '../../../lib/chatStore'
import { v4 as uuidv4 } from 'uuid'

const MISSING_INFO_PHRASE = "i don't currently have enough verified information"

function detectConfidence(reply: string): 'high' | 'medium' | 'low' {
  const lower = reply.toLowerCase()
  if (lower.includes(MISSING_INFO_PHRASE) || lower.includes("i've logged your question")) return 'low'
  if (lower.includes('based on what i know') || lower.includes('i believe')) return 'medium'
  return 'high'
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, history = [] } = await req.json()

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { reply: "I'm currently unavailable. Please contact Atul directly at atulsharma8790@gmail.com", confidence: 'low' },
        { status: 200 }
      )
    }

    const client = new Anthropic({ apiKey })
    const systemPrompt = buildSystemPrompt()

    const anthropicMessages = history
      .slice(-8)
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))
    anthropicMessages.push({ role: 'user' as const, content: message })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    const reply =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : "I'm sorry, I couldn't generate a response. Please try again."

    const confidence = detectConfidence(reply)
    const category = categoriseQuestion(message)

    trackAnalytics(message, category)

    if (confidence === 'low') {
      saveUnansweredQuestion({
        id: uuidv4(),
        question: message,
        sessionId: sessionId ?? 'unknown',
        timestamp: new Date().toISOString(),
        category,
        status: 'pending',
      })
    }

    return NextResponse.json({ reply, confidence })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { reply: "I'm experiencing a technical issue. Please try again shortly or contact Atul directly at atulsharma8790@gmail.com.", confidence: 'low' },
      { status: 200 }
    )
  }
}
