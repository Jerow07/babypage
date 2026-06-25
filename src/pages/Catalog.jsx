import { useState, useEffect } from 'react'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

export default function Catalog() {
  const [loading, setLoading] = useState(true)
  const [filtered, setFiltered] = useState(products)
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    sort: '',
    maxPrice: 15000,
  })

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let result = [...products]

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category)
    }

    if (filters.size) {
      result = result.filter((p) => p.sizes.includes(filters.size))
    }

    result = result.filter((p) => p.price <= filters.maxPrice)

    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    setFiltered(result)
  }, [filters])

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display font-black text-cacao text-4xl sm:text-5xl mb-2">
            Catálogo
          </h1>
          <p className="font-body text-arena">
            Toda la colección Nubecitta en un solo lugar
          </p>
        </div>

        <FilterBar total={filtered.length} onChange={setFilters} />

        <ProductGrid products={filtered} loading={loading} cols={4} />
      </div>
    </main>
  )
}
