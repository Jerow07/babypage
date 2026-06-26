import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import Badge from './Badge'
import useCart from '../hooks/useCart'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [adding, setAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    const size = selectedSize || product.sizes[0]
    setAdding(true)
    addToCart(product, size)
    setTimeout(() => setAdding(false), 600)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setSelectedSize(null) }}
    >
      <Link to={`/producto/${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              hovered ? 'scale-110' : 'scale-100'
            }`}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="lila">Nuevo</Badge>}
            {product.discount > 0 && (
              <Badge variant="rosa">-{product.discount}%</Badge>
            )}
          </div>

          {!product.stock && (
            <div className="absolute inset-0 bg-cream/60 flex items-center justify-center">
              <Badge variant="arena">Sin stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-display font-semibold text-cacao text-sm leading-tight mb-1 group-hover:text-cacao/70 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="fill-rosa-dark text-rosa-dark" />
          <span className="text-xs font-body text-arena">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-display font-bold text-cacao text-base">
            ${product.price.toLocaleString('es-AR')}
          </span>
          {product.discount > 0 && (
            <span className="font-body text-arena text-xs line-through">
              ${product.originalPrice.toLocaleString('es-AR')}
            </span>
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-1 mb-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => { e.preventDefault(); setSelectedSize(s) }}
                className={`px-2 py-0.5 rounded-xl text-xs font-body border transition-colors ${
                  selectedSize === s
                    ? 'bg-cacao text-cream border-cacao'
                    : 'border-arena/40 text-arena hover:border-cacao hover:text-cacao'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        <button
          onClick={handleAdd}
          disabled={!product.stock || adding}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl font-display font-bold text-sm transition-all active:scale-95 ${
            adding
              ? 'bg-celeste text-cacao'
              : product.stock
              ? 'bg-rosa hover:bg-rosa-dark text-cacao'
              : 'bg-arena/20 text-arena cursor-not-allowed'
          }`}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingBag size={15} />
          {adding ? '¡Agregado!' : 'Agregar al carrito'}
        </button>
      </div>
    </motion.div>
  )
}
