import { NextRequest, NextResponse } from 'next/server'
import { openSourceProjects } from '../../../../data/content'
import {
  getAllVisibility, toggleProjectVisibility, setProjectVisibility,
  getProjectOrder, setProjectOrder, applyOrder,
} from '../../../../lib/project-visibility'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'atul-admin-secret'

function isAuthorised(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  return token === ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const vis     = getAllVisibility()
  const order   = getProjectOrder()
  const allIds  = openSourceProjects.map(p => p.id)
  const ordered = applyOrder(allIds, order)

  const projects = ordered.map(id => {
    const p = openSourceProjects.find(x => x.id === id)!
    return { id: p.id, title: p.title, tagline: p.tagline, category: p.category, status: p.status, color: p.color, visible: vis[p.id] !== false }
  })

  return NextResponse.json({ projects })
}

export async function POST(req: NextRequest) {
  if (!isAuthorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const { id, action, visible, order } = body

  // Reorder action
  if (action === 'reorder') {
    if (!Array.isArray(order)) return NextResponse.json({ error: 'order must be an array' }, { status: 400 })
    setProjectOrder(order)
    return NextResponse.json({ ok: true, order })
  }

  // Visibility toggle/set
  if (!id) return NextResponse.json({ error: 'Missing project id' }, { status: 400 })
  if (!openSourceProjects.some(p => p.id === id)) {
    return NextResponse.json({ error: `No project found with id "${id}"` }, { status: 404 })
  }

  let newVisible: boolean
  if (action === 'set' && typeof visible === 'boolean') {
    setProjectVisibility(id, visible)
    newVisible = visible
  } else {
    newVisible = toggleProjectVisibility(id)
  }

  return NextResponse.json({ ok: true, id, visible: newVisible })
}
