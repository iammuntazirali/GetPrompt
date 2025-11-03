import test from 'node:test'
import assert from 'node:assert/strict'

test('GET /api/prompts returns 200 and JSON array', async (t) => {
  // The server should be started externally (CI starts it before tests).
  const url = process.env.URL || 'http://localhost:4000/api/prompts'

  const res = await fetch(url)
  assert.equal(res.status, 200)
  const body = await res.json()
  assert.ok(Array.isArray(body), 'Response should be an array')
})
