import { NextRequest, NextResponse } from 'next/server'
import { loadUnansweredQuestions, updateQuestionStatus } from '../../../../lib/chatStore'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'atul-admin-secret'

function isAuthorised(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  return token === ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const questions = loadUnansweredQuestions()
  return NextResponse.json({ questions })
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const { id, status, answer } = await req.json()
  if (!id || !status) {
    return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
  }
  updateQuestionStatus(id, status, answer)
  return NextResponse.json({ success: true })
}
