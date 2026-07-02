import { NextResponse } from 'next/server'
import { getAllVisibility, getProjectOrder } from '../../../../lib/project-visibility'

export async function GET() {
  const vis    = getAllVisibility()
  const hidden = Object.entries(vis).filter(([, v]) => v === false).map(([id]) => id)
  const order  = getProjectOrder()
  return NextResponse.json({ hidden, order }, { headers: { 'Cache-Control': 'no-store' } })
}
