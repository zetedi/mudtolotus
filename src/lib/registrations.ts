// Registration requests are written straight to Firestore through its REST API, so the
// static site needs no SDK and no server. firestore.rules decides what is accepted.
import type { Lang } from '../data/retreat.ts'
import { firebase } from '../data/site.ts'

export type Registration = {
  name: string
  email: string
  phone?: string
  country: string
  motivation: string
  language: Lang
}

const database = `projects/${firebase.projectId}/databases/(default)`
export const commitUrl = `https://firestore.googleapis.com/v1/${database}/documents:commit?key=${firebase.apiKey}`

/** Body of a Firestore `commit` that creates one registration document with a server-side timestamp. */
export function registrationWrite(registration: Registration, id: string) {
  const fields: Record<string, { stringValue: string }> = {}
  for (const [key, value] of Object.entries(registration)) {
    const text = typeof value === 'string' ? value.trim() : ''
    if (text) fields[key] = { stringValue: text }
  }
  return {
    writes: [
      {
        update: { name: `${database}/documents/${firebase.registrationsCollection}/${id}`, fields },
        currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: 'submittedAt', setToServerValue: 'REQUEST_TIME' }],
      },
    ],
  }
}

export async function submitRegistration(registration: Registration, fetchImpl: typeof fetch = fetch) {
  const response = await fetchImpl(commitUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationWrite(registration, crypto.randomUUID())),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`Registration was rejected (HTTP ${response.status})`)
}
