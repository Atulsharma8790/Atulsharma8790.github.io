import { NextResponse } from 'next/server'
import { getAllVisibilityAsync, getProjectOrderAsync } from '../../../../lib/project-visibility'

export const dynamic = 'force-dynamic'

export async function GET() {
  const vis    = await getAllVisibilityAsync()
  const hidden = Object.entries(vis).filter(([, v]) => v === false).map(([id]) => id)
  const order  = await getProjectOrderAsync()
  return NextResponse.json({ hidden, order }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
