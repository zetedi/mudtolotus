import { test } from 'node:test'
import assert from 'node:assert/strict'
import { commitUrl, registrationWrite, submitRegistration, type Registration } from './registrations.ts'

const sample: Registration = {
  name: '  Nour Example ',
  email: 'nour@example.com',
  phone: '',
  country: 'Egypt',
  motivation: 'Clay and colour.',
  language: 'ar',
}

test('builds a create-only commit with trimmed strings and a server timestamp', () => {
  const body = registrationWrite(sample, 'abc')
  assert.equal(body.writes.length, 1)
  const [write] = body.writes
  assert.match(write.update.name, /\/documents\/registrations\/abc$/)
  assert.deepEqual(write.currentDocument, { exists: false })
  assert.deepEqual(write.updateTransforms, [{ fieldPath: 'submittedAt', setToServerValue: 'REQUEST_TIME' }])
  assert.deepEqual(write.update.fields, {
    name: { stringValue: 'Nour Example' },
    email: { stringValue: 'nour@example.com' },
    country: { stringValue: 'Egypt' },
    motivation: { stringValue: 'Clay and colour.' },
    language: { stringValue: 'ar' },
  })
  assert.ok(!('phone' in write.update.fields), 'empty optional phone is omitted so the rules accept it')
})

test('posts JSON to the Firestore commit endpoint', async () => {
  let seen: { url: string; init: RequestInit } | undefined
  const fakeFetch = (async (url: string | URL | Request, init?: RequestInit) => {
    seen = { url: String(url), init: init ?? {} }
    return new Response('{}', { status: 200 })
  }) as typeof fetch
  await submitRegistration(sample, fakeFetch)
  assert.ok(seen)
  assert.equal(seen.url, commitUrl)
  assert.equal(seen.init.method, 'POST')
  const parsed = JSON.parse(String(seen.init.body))
  assert.equal(parsed.writes[0].update.fields.email.stringValue, 'nour@example.com')
})

test('rejects when Firestore refuses the write', async () => {
  const denied = (async () => new Response('{"error":{}}', { status: 403 })) as typeof fetch
  await assert.rejects(() => submitRegistration(sample, denied), /HTTP 403/)
})
