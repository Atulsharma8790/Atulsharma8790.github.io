/**
 * Project visibility & order — persisted in Vercel KV.
 * Falls back to in-memory globals when KV env vars aren't set (local dev).
 */

// ── In-memory fallback (local dev / missing KV env) ─────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __projectVisibility: Map<string, boolean> | undefined
  // eslint-disable-next-line no-var
  var __projectOrder: string[] | undefined
}

if (!global.__projectVisibility) global.__projectVisibility = new Map<string, boolean>()
if (!global.__projectOrder)      global.__projectOrder      = []

const memVis   = global.__projectVisibility
const memOrder = global.__projectOrder

// ── KV helpers ───────────────────────────────────────────────────────────────

const KV_VIS_KEY   = 'portfolio:project_visibility'
const KV_ORDER_KEY = 'portfolio:project_order'

function hasKv(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function kvGet<T>(key: string): Promise<T | null> {
  if (!hasKv()) return null
  try {
    const { kv } = await import('@vercel/kv')
    return await kv.get<T>(key)
  } catch {
    return null
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  if (!hasKv()) return
  try {
    const { kv } = await import('@vercel/kv')
    await kv.set(key, value)
  } catch {
    /* ignore */
  }
}

// ── Visibility ───────────────────────────────────────────────────────────────

/** Returns visibility map — true = visible (default when not set). */
export async function getAllVisibilityAsync(): Promise<Record<string, boolean>> {
  const stored = await kvGet<Record<string, boolean>>(KV_VIS_KEY)
  if (stored) return stored
  // fallback: in-memory
  const result: Record<string, boolean> = {}
  memVis.forEach((v, id) => { result[id] = v })
  return result
}

export async function setProjectVisibilityAsync(id: string, visible: boolean): Promise<void> {
  const current = await getAllVisibilityAsync()
  current[id] = visible
  await kvSet(KV_VIS_KEY, current)
  // keep in-memory in sync for same-instance reads
  memVis.set(id, visible)
}

export async function toggleProjectVisibilityAsync(id: string): Promise<boolean> {
  const current = await getAllVisibilityAsync()
  const next = !(current[id] !== false)
  current[id] = next
  await kvSet(KV_VIS_KEY, current)
  memVis.set(id, next)
  return next
}

// ── Order ────────────────────────────────────────────────────────────────────

export async function getProjectOrderAsync(): Promise<string[]> {
  const stored = await kvGet<string[]>(KV_ORDER_KEY)
  if (stored && stored.length > 0) return stored
  return [...memOrder]
}

export async function setProjectOrderAsync(ids: string[]): Promise<void> {
  await kvSet(KV_ORDER_KEY, ids)
  memOrder.length = 0
  memOrder.push(...ids)
}

// ── Util ─────────────────────────────────────────────────────────────────────

export function applyOrder(allIds: string[], customOrder: string[]): string[] {
  if (customOrder.length === 0) return allIds
  const rest = allIds.filter(id => !customOrder.includes(id))
  return [...customOrder.filter(id => allIds.includes(id)), ...rest]
}

// ── Sync shims (for backward compat — these use in-memory only) ──────────────

export function isProjectVisible(id: string): boolean {
  return memVis.get(id) !== false
}

export function getAllVisibility(): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  memVis.forEach((v, id) => { result[id] = v })
  return result
}

export function getProjectOrder(): string[] {
  return [...memOrder]
}
