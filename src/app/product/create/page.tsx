'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProductPage() {
const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [categoryId, setCategoryId] = useState('')
const [error, setError] = useState('')
const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault()
setError('')

const token = localStorage.getItem('token')
if (!token) {
  setError('You must be logged in.')
  return
}

try {
  const res = await fetch('/api/auth/product/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // ✅ use Bearer here
    },
    body: JSON.stringify({
      name,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    setError(data.message || 'Failed to create product')
  } else {
    alert('✅ Product created!')
    router.push('/products') // redirect after success
  }
} catch (err) {
  console.error('Error creating product:', err)
  setError('Something went wrong.')
}
}

return (
<div className="max-w-lg mx-auto p-4">
<h2 className="text-xl font-bold mb-4">Create Product</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input
type="text"
placeholder="Name"
value={name}
onChange={e => setName(e.target.value)}
className="border p-2 w-full"
required
/>
<input
type="number"
placeholder="Price"
value={price}
onChange={e => setPrice(e.target.value)}
className="border p-2 w-full"
required
/>
<input
type="number"
placeholder="Category ID"
value={categoryId}
onChange={e => setCategoryId(e.target.value)}
className="border p-2 w-full"
required
/>
{error && <p className="text-red-500">{error}</p>}
<button type="submit" className="bg-blue-600 text-white px-4 py-2">
Create
</button>
</form>
</div>
)
}

