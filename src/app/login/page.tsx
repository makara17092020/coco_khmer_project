'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const router = useRouter()

async function handleLogin(e: React.FormEvent) {
e.preventDefault()
setError('')

try {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('token', data.token) // ✅ Store JWT
    alert('Login successful!')
    router.push('/dashboard') // ✅ Redirect
  } else {
    setError(data.message || 'Login failed')
  }
} catch (err) {
  setError('Something went wrong. Please try again.')
  console.error('Login error:', err)
}

}

return (
<div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
<h2>Login</h2>
<form onSubmit={handleLogin}>
<div style={{ marginBottom: '1rem' }}>
<label>Email:</label>
<input
type="email"
value={email}
required
onChange={(e) => setEmail(e.target.value)}
style={{ width: '100%', padding: '8px' }}
/>
</div>

    <div style={{ marginBottom: '1rem' }}>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
    </div>

    {error && (
      <div style={{ color: 'red', marginBottom: '1rem' }}>
        {error}
      </div>
    )}

    <button type="submit" style={{ padding: '10px 20px' }}>
      Login
    </button>
  </form>
</div>

)
}