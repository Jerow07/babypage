import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'

const CATEGORIES = [
  { label: 'Todos', value: '' },
  { label: 'Bodies', value: 'bodies' },
  { label: 'Pijamas', value: 'pijamas' },
  { label: 'Conjuntos', value: 'conjuntos' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Calzado', value: 'calzado' },
]

const SIZES = ['0-3m', '3-6m', '6-9m', '9-12m', '12-18m', 'RN']

const SORT_OPTIONS = [
  { label: 'Relevancia', value: '' },
  { label: 'Precio: menor a mayor', value: 'price_asc' },
  { label: 'Precio: mayor a menor', value: 'price_desc' },
  { label: 'Más nuevos', value: 'new' },
  { label: 'Mejor puntuados', value: 'rating' },
]

export default function FilterBar({ total, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('categoria') || '')
  const [size, setSize] = useState('')
  const [sort, setSort] = useState('')
  const [maxPrice, setMaxPrice] = useState(15000)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    onChange({ category, size, sort, maxPrice })
  }, [category, size, sort, maxPrice])

  useEffect(() => {
    const cat = searchParams.get('categoria') || ''
    setCategory(cat)
  }, [searchParams])

  const setcat = (val) => {
    setCategory(val)
    const p = new URLSearchParams(searchParams)
    if (val) p.set('categoria', val)
    else p.delete('categoria')
    setSearchParams(p)
  }

  return (
    <div className="bg-white rounded-3xl shadow-soft p-4 mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-display font-bold text-cacao text-sm">
          {total} productos encontrados
        </span>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="ml-auto md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-arena/40 text-sm text-arena"
        >
          <SlidersHorizontal size={14} />
          Filtros
        </button>
      </div>

      <div className={`${showFilters ? 'flex' : 'hidden md:flex'} flex-col gap-4`}>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setcat(c.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-body transition-colors ${
                category === c.value
                  ? 'bg-cacao text-cream font-semibold'
                  : 'bg-cream text-arena hover:bg-rosa/30 hover:text-cacao border border-rosa/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-display font-semibold text-arena uppercase">
              Talle:
            </span>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(size === s ? '' : s)}
                className={`px-2.5 py-1 rounded-xl text-xs font-body transition-colors ${
                  size === s
                    ? 'bg-lila text-cacao font-semibold'
                    : 'border border-arena/30 text-arena hover:border-lila hover:text-cacao'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-display font-semibold text-arena uppercase whitespace-nowrap">
              Hasta ${maxPrice.toLocaleString('es-AR')}
            </span>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 accent-cacao"
              aria-label="Precio máximo"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-arena/30 rounded-xl px-3 py-1.5 text-sm font-body text-cacao bg-cream focus:outline-none focus:ring-2 focus:ring-rosa"
            aria-label="Ordenar por"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
