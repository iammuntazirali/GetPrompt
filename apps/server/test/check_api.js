// Simple endpoint smoke test: fetch /api/prompts and exit with code 0 on success
const url = process.env.URL || 'http://localhost:4000/api/prompts'

async function run() {
  try {
    const res = await fetch(url, { timeout: 5000 })
    if (!res.ok) {
      console.error('Bad status', res.status)
      process.exit(2)
    }
    const data = await res.json()
    console.log('OK — endpoint returned JSON array length', Array.isArray(data) ? data.length : 'unknown')
    process.exit(0)
  } catch (err) {
    console.error('Error fetching', err.message || err)
    process.exit(1)
  }
}

run()
