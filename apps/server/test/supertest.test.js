import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../server.js'

describe('GET /api/prompts (supertest)', () => {
  it('returns 200 and JSON array', async () => {
    const res = await request(app).get('/api/prompts')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
