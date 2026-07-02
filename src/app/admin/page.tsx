'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  CheckCircle2, XCircle, MessageSquare, BarChart3, RefreshCw,
  Eye, EyeOff, BookOpen, Plus, Trash2, PenLine, LayoutGrid,
  BrainCircuit, Sparkles, Search, ChevronDown, ChevronUp, GripVertical,
  Rocket, Github, ExternalLink,
} from 'lucide-react'

const LIVE_TOOLS = [
  { name: 'AI Test Case Generator',            dir: 'qa-test-case-generator',          demo: 'https://qa-test-case-generator-nine.vercel.app',         github: 'https://github.com/atulsharma8790/qa-test-case-generator' },
  { name: 'TalentLens',                        dir: 'talent-lens',                     demo: 'https://talent-lens-murex.vercel.app',                   github: 'https://github.com/atulsharma8790/talent-lens' },
  { name: 'AI SDLC Orchestrator',              dir: 'ai-sdlc-orchestrator',            demo: 'https://ai-sdlc-orchestrator.vercel.app',                github: 'https://github.com/atulsharma8790/ai-sdlc-orchestrator' },
  { name: 'SDLC Metrics Generator',            dir: 'sdlc-metrics-generator',          demo: 'https://sdlc-metrics-generator.vercel.app',              github: 'https://github.com/atulsharma8790/sdlc-metrics-generator' },
  { name: 'Incident Post-Mortem Generator',    dir: 'incident-postmortem-generator',   demo: 'https://incident-postmortem-generator-two.vercel.app',   github: 'https://github.com/atulsharma8790/incident-postmortem-generator' },
  { name: 'Sprint Retrospective Analyzer',     dir: 'sprint-retro-analyzer',           demo: 'https://sprint-retro-analyzer.vercel.app',               github: 'https://github.com/atulsharma8790/sprint-retro-analyzer' },
  { name: 'PRD Generator',                     dir: 'prd-generator',                   demo: 'https://prd-generator-gold.vercel.app',                  github: 'https://github.com/atulsharma8790/prd-generator' },
  { name: 'AI Performance Test Planner',       dir: 'perf-test-planner',               demo: 'https://perf-test-planner.vercel.app',                   github: 'https://github.com/atulsharma8790/perf-test-planner' },
  { name: 'Test Automation Skeleton Generator',dir: 'test-automation-skeleton',        demo: 'https://test-automation-skeleton.vercel.app',            github: 'https://github.com/atulsharma8790/test-automation-skeleton' },
  { name: 'QuizMenti',                         dir: 'quiz-menti',                      demo: 'https://quiz-menti.vercel.app',                          github: 'https://github.com/atulsharma8790/quiz-menti' },
  { name: 'AuctionRoom',                       dir: 'auction-room',                    demo: 'https://auction-room-six.vercel.app',                    github: 'https://github.com/atulsharma8790/auction-room' },
  { name: 'Prompt Lab — Generator & Evaluator',dir: 'prompt-generator-evaluator',      demo: 'https://prompt-generator-evaluator.vercel.app',          github: 'https://github.com/atulsharma8790/prompt-generator-evaluator' },
  { name: 'QA Intelligence MCP Server',        dir: 'qa-mcp-server',                   demo: 'https://qa-mcp-server-theta.vercel.app',                 github: 'https://github.com/atulsharma8790/qa-mcp-server' },
  { name: 'QA Autopilot (FailSight)',           dir: 'qa-autopilot',                    demo: 'https://qa-autopilot.vercel.app',                        github: 'https://github.com/atulsharma8790/qa-autopilot' },
  { name: 'ReleaseGuard (ShipMind)',            dir: 'release-guard',                   demo: 'https://release-guard-blue.vercel.app',                  github: 'https://github.com/Atulsharma8790/release-guard' },
  { name: 'Bug Hunter Agent (GhostQA)',         dir: 'bug-hunter-agent',                demo: 'https://bug-hunter-agent.vercel.app',                    github: 'https://github.com/Atulsharma8790/bug-hunter-agent' },
]

interface Question {
  id: string
  question: string
  sessionId: string
  timestamp: string
  category: string
  status: 'pending' | 'answered' | 'dismissed'
  answer?: string
}

interface Analytics {
  totalQuestions: number
  topQuestions: { question: string; count: number }[]
  categories: { category: string; count: number }[]
}

interface KnowledgeNote {
  id: string
  topic: string
  answer: string
  addedAt: string
}

interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: string
  status: string
  color: string
  visible: boolean
}

// ── Tiny toast ────────────────────────────────────────────────
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white shadow-xl"
      style={{ background: 'linear-gradient(135deg,#22C55E,#16A34A)', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }}>
      <CheckCircle2 size={16} /> {msg}
    </div>
  )
}

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [toast, setToast] = useState('')

  const [tab, setTab] = useState<'knowledge' | 'projects' | 'analytics' | 'deployments'>('knowledge')

  // Questions
  const [questions, setQuestions] = useState<Question[]>([])
  const [qFilter, setQFilter] = useState<'pending' | 'answered' | 'dismissed' | 'all'>('pending')
  const [answerDraft, setAnswerDraft] = useState<Record<string, string>>({})
  const [expandedQ, setExpandedQ] = useState<string | null>(null)

  // Knowledge notes
  const [notes, setNotes] = useState<KnowledgeNote[]>([])
  const [noteSearch, setNoteSearch] = useState('')
  const [newTopic, setNewTopic] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editAnswer, setEditAnswer] = useState('')

  // Projects
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([])
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const dragId = useRef<string | null>(null)

  // Analytics
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const showToast = (msg: string) => setToast(msg)

  // ── Fetchers ────────────────────────────────────────────────
  const fetchQuestions = useCallback(async () => {
    const res = await fetch('/api/admin/questions', { headers: { 'x-admin-token': token } })
    if (res.ok) setQuestions((await res.json()).questions)
  }, [token])

  const fetchNotes = useCallback(async () => {
    const res = await fetch('/api/admin/notes', { headers: { 'x-admin-token': token } })
    if (res.ok) setNotes((await res.json()).notes)
  }, [token])

  const fetchProjects = useCallback(async () => {
    const res = await fetch(`/api/admin/projects?token=${token}`)
    if (res.ok) setProjectItems((await res.json()).projects ?? [])
  }, [token])

  const toggleProject = async (id: string) => {
    setTogglingId(id)
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, action: 'toggle' }),
    })
    if (res.ok) {
      const { visible } = await res.json()
      setProjectItems(items => items.map(p => p.id === id ? { ...p, visible } : p))
    }
    setTogglingId(null)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ action: 'reorder', order: projectItems.map(p => p.id) }),
    })
    setSavingOrder(false)
    showToast('Order saved — live on the site!')
  }

  const onDragStart = (e: React.DragEvent, id: string) => {
    dragId.current = id
    e.dataTransfer.effectAllowed = 'move'
  }
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const sourceId = dragId.current
    if (!sourceId || sourceId === targetId) return
    setProjectItems(items => {
      const next = [...items]
      const from = next.findIndex(p => p.id === sourceId)
      const to   = next.findIndex(p => p.id === targetId)
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    dragId.current = null
  }

  const fetchAnalytics = useCallback(async () => {
    const res = await fetch('/api/admin/analytics', { headers: { 'x-admin-token': token } })
    if (res.ok) setAnalytics(await res.json())
  }, [token])

  const refreshAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchQuestions(), fetchNotes()])
    setLoading(false)
  }, [fetchQuestions, fetchNotes])

  useEffect(() => {
    if (!authed) return
    if (tab === 'knowledge') refreshAll()
    else if (tab === 'projects') fetchProjects()
    else fetchAnalytics()
  }, [authed, tab, refreshAll, fetchProjects, fetchAnalytics])

  // ── Auth ────────────────────────────────────────────────────
  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) return
    setLoginLoading(true); setLoginError('')
    try {
      const res = await fetch('/api/admin/questions', { headers: { 'x-admin-token': token.trim() } })
      if (res.status === 401) { setLoginError('Wrong token — check your ADMIN_TOKEN.'); return }
      if (!res.ok) { setLoginError('Server error. Try again.'); return }
      setQuestions((await res.json()).questions)
      setAuthed(true)
      fetchNotes()
    } catch { setLoginError('Network error — is the dev server running?') }
    finally { setLoginLoading(false) }
  }

  // ── Questions ───────────────────────────────────────────────
  const updateQuestion = async (id: string, status: Question['status'], answer?: string) => {
    await fetch('/api/admin/questions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, status, answer }),
    })
    await fetchQuestions()
  }

  const teachBot = async (q: Question) => {
    const answer = answerDraft[q.id]?.trim()
    if (!answer) return
    setSaving(true)
    await fetch('/api/admin/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ topic: q.question, answer }),
    })
    await updateQuestion(q.id, 'answered', answer)
    await fetchNotes()
    setSaving(false)
    setExpandedQ(null)
    showToast('Chatbot taught! It will use this answer from now on.')
  }

  // ── Notes ───────────────────────────────────────────────────
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTopic.trim() || !newAnswer.trim()) return
    setSaving(true)
    await fetch('/api/admin/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ topic: newTopic, answer: newAnswer }),
    })
    setNewTopic(''); setNewAnswer(''); setSaving(false)
    await fetchNotes()
    showToast('Knowledge added — chatbot updated instantly.')
  }

  const saveEdit = async (id: string) => {
    await fetch('/api/admin/notes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, topic: editTopic, answer: editAnswer }),
    })
    setEditId(null)
    await fetchNotes()
    showToast('Knowledge updated.')
  }

  const deleteNote = async (id: string) => {
    await fetch('/api/admin/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id }),
    })
    await fetchNotes()
    showToast('Entry removed from knowledge base.')
  }



  // ── Login screen ────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-[#12121E] border border-white/[0.08] p-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm mb-6">AS</div>
          <h1 className="text-white font-bold text-xl mb-1">Admin Portal</h1>
          <p className="text-[#7B8FA8] text-sm mb-6">Manage your chatbot knowledge base.</p>
          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                placeholder="Admin token"
                value={token}
                onChange={e => { setToken(e.target.value); setLoginError('') }}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#0A0A0F] border text-white text-sm placeholder-[#334155] focus:outline-none transition-colors"
                style={{ borderColor: loginError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }}
                autoComplete="current-password"
                autoFocus
              />
              <button type="button" onClick={() => setShowToken(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7F96]">
                {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {loginError && <p className="text-xs font-medium px-1 text-red-400">⚠ {loginError}</p>}
            <button type="submit" disabled={loginLoading || !token.trim()}
              className="w-full py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loginLoading ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> Verifying...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const pending = questions.filter(q => q.status === 'pending')
  const filteredQ = qFilter === 'all' ? questions : questions.filter(q => q.status === qFilter)
  const filteredNotes = noteSearch.trim()
    ? notes.filter(n => n.topic.toLowerCase().includes(noteSearch.toLowerCase()) || n.answer.toLowerCase().includes(noteSearch.toLowerCase()))
    : notes
  const visibleCount = projectItems.filter(p => p.visible).length
  const hiddenCount  = projectItems.filter(p => !p.visible).length

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0A0A0F]/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs">AS</div>
            <span className="font-semibold text-sm">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (tab === 'knowledge') refreshAll(); else if (tab === 'projects') fetchProjects(); else fetchAnalytics() }}
              className="p-2 rounded-lg text-[#7B8FA8] hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => {
                setAuthed(false)
                setToken('')
                window.location.href = '/'
              }}
              className="px-3 py-1.5 rounded-lg text-[#7B8FA8] hover:text-white text-sm border border-white/[0.07] hover:border-white/[0.15] transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { id: 'knowledge'   as const, label: 'Knowledge Center',  icon: <BrainCircuit size={15} />, badge: pending.length,         badgeColor: 'bg-amber-500/20 text-amber-400' },
            { id: 'projects'    as const, label: 'Project Visibility', icon: <LayoutGrid size={15} />,  badge: hiddenCount,             badgeColor: 'bg-red-500/20 text-red-400' },
            { id: 'deployments' as const, label: 'Live Deployments',   icon: <Rocket size={15} />,       badge: LIVE_TOOLS.length,       badgeColor: 'bg-emerald-500/20 text-emerald-400' },
            { id: 'analytics'   as const, label: 'Analytics',          icon: <BarChart3 size={15} />,    badge: 0,                       badgeColor: '' },
          ].map(({ id, label, icon, badge, badgeColor }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === id ? 'bg-[#6366F1] text-white' : 'text-[#7B8FA8] hover:text-white bg-[#12121E] border border-white/[0.07]'}`}>
              {icon} {label}
              {badge > 0 && <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${tab === id ? 'bg-white/20 text-white' : badgeColor}`}>{badge}</span>}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            KNOWLEDGE CENTER
        ══════════════════════════════════════════════════════ */}
        {tab === 'knowledge' && (
          <div className="space-y-8">

            {/* ── STAT STRIP ── */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">{pending.length}</div>
                <div className="text-[#7B8FA8] text-xs mt-0.5">Needs Answer</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">{notes.length}</div>
                <div className="text-[#7B8FA8] text-xs mt-0.5">Knowledge Entries</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-4 text-center">
                <div className="text-2xl font-bold text-[#6366F1]">{questions.filter(q => q.status === 'answered').length}</div>
                <div className="text-[#7B8FA8] text-xs mt-0.5">Questions Answered</div>
              </div>
            </div>

            {/* ══ SECTION 1: Teach the bot proactively ══ */}
            <div className="rounded-2xl bg-[#12121E] border border-[#6366F1]/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.04))' }}>
                <Sparkles size={16} className="text-[#6366F1]" />
                <div>
                  <p className="text-white font-semibold text-sm">Teach the Chatbot</p>
                  <p className="text-[#7B8FA8] text-xs mt-0.5">Add anything you want Digital Atul to know — takes effect on the next visitor message.</p>
                </div>
              </div>
              <form onSubmit={addNote} className="p-6 space-y-3">
                <input
                  type="text"
                  placeholder="Topic / Question (e.g. 'What is Atul's notice period?')"
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#334155] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="Answer / information the chatbot should use when visitors ask about this topic..."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#334155] focus:outline-none focus:border-[#6366F1]/50 transition-colors resize-none"
                />
                <button type="submit" disabled={saving || !newTopic.trim() || !newAnswer.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
                  <BrainCircuit size={14} /> {saving ? 'Teaching...' : 'Add to Knowledge Base'}
                </button>
              </form>
            </div>

            {/* ══ SECTION 2: Pending questions from chatbot ══ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={15} className="text-[#7B8FA8]" />
                  <h2 className="text-white font-semibold text-sm">Questions from Visitors</h2>
                  {pending.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{pending.length} need answer</span>
                  )}
                </div>
                {/* Filter pills */}
                <div className="flex gap-1">
                  {(['pending','answered','dismissed','all'] as const).map(f => (
                    <button key={f} onClick={() => setQFilter(f)}
                      className="text-xs px-2.5 py-1 rounded-lg transition-all capitalize"
                      style={{
                        background: qFilter === f ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                        color: qFilter === f ? '#818CF8' : '#6B7F96',
                        border: `1px solid ${qFilter === f ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {loading && <p className="text-[#7B8FA8] text-sm py-8 text-center">Loading...</p>}

              {!loading && filteredQ.length === 0 && (
                <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-10 text-center">
                  <MessageSquare size={28} className="text-[#334155] mx-auto mb-3" />
                  <p className="text-[#7B8FA8] text-sm">
                    {qFilter === 'pending' ? "No pending questions — your chatbot is handling everything!" : `No ${qFilter} questions.`}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {filteredQ.map(q => {
                  const isExpanded = expandedQ === q.id || q.status === 'pending'
                  return (
                    <div key={q.id} className="rounded-2xl bg-[#12121E] border overflow-hidden transition-all"
                      style={{ borderColor: q.status === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.07)' }}>

                      {/* Question header */}
                      <div className="px-5 py-4 flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              q.status === 'pending'   ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              q.status === 'answered'  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                         'bg-white/5 text-[#7B8FA8] border border-white/10'
                            }`}>{q.status}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20">{q.category}</span>
                            <span className="text-[#475569] text-xs ml-auto">{new Date(q.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-white font-medium text-sm">{q.question}</p>
                        </div>
                        {q.status !== 'pending' && (
                          <button onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}
                            className="flex-shrink-0 text-[#6B7F96] hover:text-white transition-colors mt-1">
                            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>
                        )}
                      </div>

                      {/* Existing answer (answered/dismissed) */}
                      {q.answer && isExpanded && (
                        <div className="px-5 pb-4 -mt-1">
                          <div className="pl-4 border-l-2 border-emerald-500/30">
                            <p className="text-[#94A3B8] text-xs">Your answer:</p>
                            <p className="text-[#CBD5E1] text-sm mt-0.5">{q.answer}</p>
                          </div>
                        </div>
                      )}

                      {/* Pending — answer form */}
                      {q.status === 'pending' && (
                        <div className="px-5 pb-5 space-y-3 border-t border-white/[0.05] pt-4">
                          <textarea
                            rows={3}
                            placeholder="Type your answer here — the chatbot will start using it immediately after you save..."
                            value={answerDraft[q.id] ?? ''}
                            onChange={e => setAnswerDraft(d => ({ ...d, [q.id]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#334155] focus:outline-none focus:border-[#6366F1]/50 transition-colors resize-none"
                          />
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => teachBot(q)}
                              disabled={saving || !answerDraft[q.id]?.trim()}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                              style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', color: '#fff', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                              <BrainCircuit size={13} /> Save & Teach Bot
                            </button>
                            <button
                              onClick={() => updateQuestion(q.id, 'dismissed')}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#7B8FA8] hover:text-white text-sm font-medium transition-all">
                              <XCircle size={13} /> Dismiss
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ══ SECTION 3: Full knowledge base ══ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-[#7B8FA8]" />
                  <h2 className="text-white font-semibold text-sm">Knowledge Base</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#12121E] border border-white/[0.07] text-[#6B7F96]">{notes.length} entries</span>
                </div>
                {notes.length > 4 && (
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={noteSearch}
                      onChange={e => setNoteSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg bg-[#12121E] border border-white/[0.08] text-white text-xs placeholder-[#334155] focus:outline-none focus:border-[#6366F1]/50 w-48 transition-colors"
                    />
                  </div>
                )}
              </div>

              {filteredNotes.length === 0 && (
                <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-8 text-center">
                  <BookOpen size={24} className="text-[#334155] mx-auto mb-2" />
                  <p className="text-[#7B8FA8] text-sm">
                    {noteSearch ? 'No entries match your search.' : 'No knowledge entries yet. Add the first one above.'}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {filteredNotes.map(note => (
                  <div key={note.id} className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-5 hover:border-white/[0.12] transition-all">
                    {editId === note.id ? (
                      <div className="space-y-3">
                        <input type="text" value={editTopic} onChange={e => setEditTopic(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#6366F1]/50" />
                        <textarea rows={4} value={editAnswer} onChange={e => setEditAnswer(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#6366F1]/50 resize-none" />
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(note.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-all">
                            <CheckCircle2 size={13} /> Save Changes
                          </button>
                          <button onClick={() => setEditId(null)}
                            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#7B8FA8] text-sm transition-all hover:text-white">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm mb-1.5">{note.topic}</p>
                          <p className="text-[#94A3B8] text-sm leading-relaxed">{note.answer}</p>
                          <p className="text-[#334155] text-xs mt-2">{new Date(note.addedAt).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => { setEditId(note.id); setEditTopic(note.topic); setEditAnswer(note.answer) }}
                            className="p-2 rounded-lg text-[#6B7F96] hover:text-white hover:bg-white/[0.06] transition-all" title="Edit">
                            <PenLine size={14} />
                          </button>
                          <button onClick={() => deleteNote(note.id)}
                            className="p-2 rounded-lg text-[#6B7F96] hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            PROJECT VISIBILITY
        ══════════════════════════════════════════════════════ */}
        {tab === 'projects' && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-5 text-center">
                <div className="text-3xl font-bold text-white">{projectItems.length}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">Total Projects</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-emerald-500/20 p-5 text-center">
                <div className="text-3xl font-bold text-emerald-400">{visibleCount}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">Visible to All</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-red-500/20 p-5 text-center">
                <div className="text-3xl font-bold text-red-400">{hiddenCount}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">Hidden</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-[#475569] text-xs">Drag <GripVertical size={11} className="inline" /> to reorder · toggle switch to show/hide</p>
              <button onClick={saveOrder} disabled={savingOrder}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all disabled:opacity-50"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8' }}>
                {savingOrder ? 'Saving…' : '💾 Save Order'}
              </button>
            </div>

            <div className="space-y-2">
              {projectItems.map(p => (
                <div key={p.id}
                  draggable
                  onDragStart={e => onDragStart(e, p.id)}
                  onDragOver={onDragOver}
                  onDrop={e => onDrop(e, p.id)}
                  className="rounded-2xl bg-[#12121E] border p-4 flex items-center gap-3 transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
                  style={{ borderColor: p.visible ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.2)', opacity: p.visible ? 1 : 0.6 }}>
                  <GripVertical size={16} className="text-[#334155] flex-shrink-0" />
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-semibold text-sm text-white">{p.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{p.category}</span>
                      {p.status === 'live'
                        ? <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
                        : <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">Building</span>}
                    </div>
                    <p className="text-[#6B7F96] text-xs truncate">{p.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-medium" style={{ color: p.visible ? '#86EFAC' : '#FCA5A5' }}>{p.visible ? 'Visible' : 'Hidden'}</span>
                    <button onClick={() => toggleProject(p.id)} disabled={togglingId === p.id}
                      className="relative w-12 h-6 rounded-full transition-all duration-200 disabled:opacity-60"
                      style={{ background: p.visible ? 'linear-gradient(135deg,#22C55E,#16A34A)' : 'rgba(255,255,255,0.08)', border: `1px solid ${p.visible ? '#22C55E50' : 'rgba(255,255,255,0.15)'}` }}>
                      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200" style={{ left: p.visible ? '24px' : '2px' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[#334155] text-xs mt-4 text-center">Visibility changes are instant · drag to reorder then hit &ldquo;Save Order&rdquo;</p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            LIVE DEPLOYMENTS
        ══════════════════════════════════════════════════════ */}
        {tab === 'deployments' && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-5 text-center">
                <div className="text-3xl font-bold text-white">{LIVE_TOOLS.length}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">Total Tools</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-emerald-500/20 p-5 text-center">
                <div className="text-3xl font-bold text-emerald-400">{LIVE_TOOLS.length}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">Live on Vercel</div>
              </div>
              <div className="rounded-2xl bg-[#12121E] border border-[#6366F1]/20 p-5 text-center">
                <div className="text-3xl font-bold text-[#818CF8]">{LIVE_TOOLS.length}</div>
                <div className="text-[#7B8FA8] text-sm mt-1">On GitHub</div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
                <Rocket size={14} className="text-emerald-400" />
                <p className="text-white font-semibold text-sm">All Live Tools</p>
                <span className="ml-auto text-[#6B7F96] text-xs">To redeploy: cd ~/Documents/CODING_ZONE/_deploy-scripts && node deploy.js &lt;dir-name&gt;</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {LIVE_TOOLS.map((tool, i) => (
                  <div key={tool.dir} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-[#475569] text-xs w-5 text-right flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{tool.name}</p>
                      <p className="text-[#475569] text-xs font-mono">{tool.dir}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <a href={tool.demo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                        <ExternalLink size={11} /> Demo
                      </a>
                      <a href={tool.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-[#7B8FA8] hover:text-white transition-colors">
                        <Github size={11} /> GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0A0A0F] border border-white/[0.07] p-5">
              <p className="text-[#7B8FA8] text-xs font-medium mb-2 uppercase tracking-widest">Deploy Command Reference</p>
              <div className="space-y-1.5 font-mono text-xs">
                <p className="text-[#94A3B8]"><span className="text-[#6B7F96]"># Deploy all projects</span></p>
                <p className="text-emerald-400 bg-[#12121E] rounded-lg px-3 py-1.5 select-all">node ~/Documents/CODING_ZONE/_deploy-scripts/deploy.js</p>
                <p className="text-[#94A3B8] mt-2"><span className="text-[#6B7F96]"># Deploy one project</span></p>
                <p className="text-emerald-400 bg-[#12121E] rounded-lg px-3 py-1.5 select-all">node ~/Documents/CODING_ZONE/_deploy-scripts/deploy.js bug-hunter-agent</p>
                <p className="text-[#94A3B8] mt-2"><span className="text-[#6B7F96]"># Deploy portfolio</span></p>
                <p className="text-emerald-400 bg-[#12121E] rounded-lg px-3 py-1.5 select-all">node ~/Documents/CODING_ZONE/_deploy-scripts/deploy.js portfolio</p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            ANALYTICS
        ══════════════════════════════════════════════════════ */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            {!analytics && <button onClick={fetchAnalytics} className="text-sm text-[#6366F1] hover:underline">Load analytics</button>}
            {analytics && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 text-center">
                    <div className="text-3xl font-bold text-white">{analytics.totalQuestions}</div>
                    <div className="text-[#7B8FA8] text-sm mt-1">Total Questions</div>
                  </div>
                  <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 text-center">
                    <div className="text-3xl font-bold text-white">{analytics.categories.length}</div>
                    <div className="text-[#7B8FA8] text-sm mt-1">Categories</div>
                  </div>
                  <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 text-center">
                    <div className="text-3xl font-bold text-amber-400">{pending.length}</div>
                    <div className="text-[#7B8FA8] text-sm mt-1">Pending Answers</div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6">
                    <h3 className="text-white font-semibold text-sm mb-4">Top Questions Asked</h3>
                    <ol className="space-y-3">
                      {analytics.topQuestions.slice(0, 10).map((q, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#6B7F96] text-xs mt-0.5 flex-shrink-0 w-4">{i + 1}.</span>
                          <span className="text-[#94A3B8] text-xs flex-1">{q.question}</span>
                          <span className="text-[#6366F1] text-xs font-semibold flex-shrink-0">×{q.count}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6">
                    <h3 className="text-white font-semibold text-sm mb-4">Question Categories</h3>
                    <div className="space-y-3">
                      {analytics.categories.sort((a, b) => b.count - a.count).map(c => (
                        <div key={c.category} className="flex items-center gap-3">
                          <span className="text-[#94A3B8] text-xs flex-1">{c.category}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-[#6366F1]"
                              style={{ width: `${Math.min(100, (c.count / analytics.totalQuestions) * 100)}%` }} />
                          </div>
                          <span className="text-[#6B7F96] text-xs w-8 text-right">{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
