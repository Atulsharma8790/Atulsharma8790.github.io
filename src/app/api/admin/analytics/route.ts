import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'atul-admin-secret'
const ANALYTICS_FILE = join(process.cwd(), 'data', 'chat-analytics.json')

export async function GET(req: NextRequest) {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  if (!existsSync(ANALYTICS_FILE)) {
    return NextResponse.json({ totalQuestions: 0, topQuestions: [], categories: [] })
  }
  const analytics = JSON.parse(readFileSync(ANALYTICS_FILE, 'utf-8'))
  return NextResponse.json(analytics)
}
