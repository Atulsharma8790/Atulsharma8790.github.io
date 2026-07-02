import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'atul-admin-secret'
const NOTES_FILE = join(process.cwd(), 'data', 'knowledge-notes.json')

interface KnowledgeNote {
  id: string
  topic: string
  answer: string
  addedAt: string
}

function isAuthorised(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  return token === ADMIN_TOKEN
}

function loadNotes(): KnowledgeNote[] {
  try {
    if (!existsSync(NOTES_FILE)) return []
    return JSON.parse(readFileSync(NOTES_FILE, 'utf-8')).notes ?? []
  } catch {
    return []
  }
}

function saveNotes(notes: KnowledgeNote[]) {
  const dir = join(process.cwd(), 'data')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(NOTES_FILE, JSON.stringify({ notes }, null, 2))
}

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return NextResponse.json({ notes: loadNotes() })
}

export async function POST(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { topic, answer } = await req.json()
  if (!topic || !answer) return NextResponse.json({ error: 'topic and answer required' }, { status: 400 })
  const notes = loadNotes()
  const note: KnowledgeNote = { id: uuidv4(), topic, answer, addedAt: new Date().toISOString() }
  notes.push(note)
  saveNotes(notes)
  return NextResponse.json({ note })
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id, topic, answer } = await req.json()
  const notes = loadNotes()
  const idx = notes.findIndex(n => n.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (topic) notes[idx].topic = topic
  if (answer) notes[idx].answer = answer
  saveNotes(notes)
  return NextResponse.json({ note: notes[idx] })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await req.json()
  const notes = loadNotes().filter(n => n.id !== id)
  saveNotes(notes)
  return NextResponse.json({ ok: true })
}
