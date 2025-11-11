import { useEffect, useState } from 'react'
import Header from './Header'
import ProductGrid from './ProductGrid'

export default function App() {
  const [seedMessage, setSeedMessage] = useState("")

  // Try seeding products once on first load (safe: backend skips if already seeded)
  useEffect(() => {
    const seed = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/seed`, { method: 'POST' })
        if (res.ok) {
          const d = await res.json()
          if (d.seeded) setSeedMessage(`Added ${d.count} products`)
        }
      } catch {}
    }
    seed()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header onCartClick={() => alert('Cart coming soon')} />

      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">dyfn apparel</h1>
        <p className="mt-3 text-gray-600">Premium tees and hoodies built for everyday comfort.</p>
        {seedMessage && <p className="mt-2 text-xs text-green-600">{seedMessage}</p>}
      </section>

      <section id="tshirts" className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold">T‑Shirts</h2>
          <a href="#hoodies" className="text-sm text-black/60 hover:text-black">See hoodies ↓</a>
        </div>
        <ProductGrid category="tshirt" />
      </section>

      <section id="hoodies" className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold">Hoodies</h2>
          <a href="#top" className="text-sm text-black/60 hover:text-black">Back to top ↑</a>
        </div>
        <ProductGrid category="hoodie" />
      </section>

      <footer className="border-t mt-12 py-8 text-center text-sm text-black/60">© {new Date().getFullYear()} dyfn. All rights reserved.</footer>
    </div>
  )
}
