'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Minimize2, Bot, User, Loader2 } from 'lucide-react'

// ── Lightweight markdown renderer ─────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let listItems: string[] = []

  const flushList = (key: string) => {
    if (listItems.length === 0) return
    nodes.push(
      <ul key={key} className="space-y-1 my-1.5 pl-0">
        {listItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] leading-snug">
            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0" />
            <span>{inlineFormat(item)}</span>
          </li>
        ))}
      </ul>
    )
    listItems = []
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList(`ul-${idx}`)
      return
    }
    // Bullet list
    if (/^[-*•]\s+/.test(trimmed)) {
      listItems.push(trimmed.replace(/^[-*•]\s+/, ''))
      return
    }
    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''))
      return
    }
    flushList(`ul-${idx}`)

    nodes.push(
      <p key={idx} className="text-[13px] leading-relaxed">
        {inlineFormat(trimmed)}
      </p>
    )
  })

  flushList('ul-end')
  return nodes
}

function inlineFormat(text: string): React.ReactNode {
  // Split on **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (/^\*\*(.+)\*\*$/.test(part)) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
    }
    if (/^\*(.+)\*$/.test(part)) {
      return <em key={i} className="italic text-[#C4B5FD]">{part.slice(1, -1)}</em>
    }
    if (/^`(.+)`$/.test(part)) {
      return <code key={i} className="px-1 py-0.5 rounded text-[11px] font-mono bg-white/10 text-[#A5B4FC]">{part.slice(1, -1)}</code>
    }
    return part
  })
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  confidence?: 'high' | 'medium' | 'low' | 'unknown'
}

const SUGGESTED_QUESTIONS = [
  "What is Atul's current role?",
  "What automation frameworks has Atul built?",
  "How does Atul approach AI in testing?",
  "What is Atul's leadership experience?",
  "What are Atul's key achievements?",
]

function generateSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Atul's Digital Assistant. I can answer questions about Atul's career, technical expertise, projects, leadership experience, and more. What would you like to know?",
      timestamp: new Date(),
      confidence: 'high',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(generateSessionId)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open, minimised])

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, minimised])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId, history: messages.slice(-6) }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        confidence: data.confidence,
      }

      setMessages(prev => [...prev, assistantMsg])
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again, or reach out to Atul directly at atulsharma8790@gmail.com.",
        timestamp: new Date(),
        confidence: 'low',
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: minimised ? 0 : 1, scale: minimised ? 0.9 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[90vw] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: '#0F0F1A',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
              pointerEvents: minimised ? 'none' : 'auto',
              display: minimised ? 'none' : undefined,
            }}
            role="dialog"
            aria-label="Digital Atul Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">Digital Atul</p>
                <p className="text-[#7B8FA8] text-xs">AI Assistant · Powered by Atul's knowledge</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimised(true)}
                  className="p-1.5 rounded-lg text-[#6B7F96] hover:text-white hover:bg-white/[0.06] transition-all"
                  aria-label="Minimise"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-[#6B7F96] hover:text-white hover:bg-white/[0.06] transition-all"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-4 scrollbar-thin" role="log" aria-live="polite">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: msg.role === 'assistant'
                        ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                        : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {msg.role === 'assistant' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-[#94A3B8]" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className="rounded-xl px-3.5 py-2.5"
                      style={{
                        background: msg.role === 'user' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${msg.role === 'user' ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                        color: '#CBD5E1',
                      }}
                    >
                      {msg.role === 'user'
                        ? <p className="text-[13px] leading-relaxed text-[#E2E8F0]">{msg.content}</p>
                        : <div className="space-y-1">{renderMarkdown(msg.content)}</div>
                      }
                    </div>
                    <p className="text-[#334155] text-[10px] mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-white/[0.05] border border-white/[0.06] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] typing-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] typing-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] typing-dot" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5" aria-label="Suggested questions">
                {SUGGESTED_QUESTIONS.slice(0, 3).map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#A5B4FC] hover:bg-[#6366F1]/20 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me about Atul..."
                disabled={loading}
                className="flex-1 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-white placeholder-[#334155] focus:outline-none focus:border-[#6366F1]/40 transition-colors disabled:opacity-50"
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-40 flex items-center justify-center text-white transition-all flex-shrink-0"
                aria-label="Send message"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (open && minimised) {
            setMinimised(false)
          } else {
            setOpen(v => !v)
            setMinimised(false)
          }
        }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white relative"
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          boxShadow: '0 0 30px rgba(99,102,241,0.5), 0 4px 20px rgba(0,0,0,0.4)',
        }}
        aria-label={open ? 'Close Digital Atul assistant' : 'Open Digital Atul assistant'}
      >
        <AnimatePresence mode="wait">
          {open && !minimised ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }} />
        )}

        {/* Notification dot */}
        {!open && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0A0A0F] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        )}
      </motion.button>
    </div>
  )
}
