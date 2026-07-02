declare global {
  // eslint-disable-next-line no-var
  var __projectVisibility: Map<string, boolean> | undefined
  // eslint-disable-next-line no-var
  var __projectOrder: string[] | undefined
}

if (!global.__projectVisibility) global.__projectVisibility = new Map<string, boolean>()
if (!global.__projectOrder)      global.__projectOrder      = []

const visStore  = global.__projectVisibility
const ordStore  = global.__projectOrder

// ── Visibility ───────────────────────────────────────────────

export function isProjectVisible(id: string): boolean {
  return visStore.get(id) !== false
}

export function toggleProjectVisibility(id: string): boolean {
  const next = !( visStore.get(id) !== false )
  visStore.set(id, next)
  return next
}

export function setProjectVisibility(id: string, visible: boolean): void {
  visStore.set(id, visible)
}

export function getAllVisibility(): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  visStore.forEach((v, id) => { result[id] = v })
  return result
}

// ── Order ────────────────────────────────────────────────────

/** Returns the custom order array (only set IDs). May be partial. */
export function getProjectOrder(): string[] {
  return [...ordStore]
}

/** Replaces the full custom order */
export function setProjectOrder(ids: string[]): void {
  ordStore.length = 0
  ordStore.push(...ids)
}

/**
 * Merge a custom order with the full project list.
 * IDs in customOrder come first; remaining IDs follow in their original sequence.
 */
export function applyOrder(allIds: string[], customOrder: string[]): string[] {
  if (customOrder.length === 0) return allIds
  const rest = allIds.filter(id => !customOrder.includes(id))
  return [...customOrder.filter(id => allIds.includes(id)), ...rest]
}
