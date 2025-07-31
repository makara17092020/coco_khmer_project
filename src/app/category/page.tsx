'use client'
import { useEffect, useState } from 'react'

type Category = { id: number; name: string }

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')

  const fetchCategories = async () => {
    const res = await fetch('/api/category')
    const data = await res.json()
    setCategories(data)
  }

  const addCategory = async () => {
    const res = await fetch('/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      setName('')
      fetchCategories()
    }
  }

  useEffect(() => { fetchCategories() }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Categories</h1>
      <input value={name} onChange={e => setName(e.target.value)} className="border p-2" />
      <button onClick={addCategory} className="ml-2 bg-blue-600 text-white px-4 py-2">Add</button>
      <ul className="mt-4 space-y-2">
        {categories.map(cat => <li key={cat.id}>{cat.name}</li>)}
      </ul>
    </div>
  )
}
