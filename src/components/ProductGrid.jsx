import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-square bg-rosa/20" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-arena/20 rounded-xl w-3/4" />
        <div className="h-3 bg-arena/20 rounded-xl w-1/3" />
        <div className="h-5 bg-arena/20 rounded-xl w-1/2" />
        <div className="h-9 bg-rosa/20 rounded-2xl" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading = false, cols = 4 }) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  if (loading) {
    return (
      <div className={`grid ${gridCols[cols]} gap-4 sm:gap-6`}>
        {Array.from({ length: cols * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🧸</p>
        <p className="font-display font-semibold text-cacao text-xl mb-2">
          No encontramos productos
        </p>
        <p className="font-body text-arena">
          Probá ajustando los filtros
        </p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-4 sm:gap-6`}>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}
