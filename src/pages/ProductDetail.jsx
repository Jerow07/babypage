import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ArrowLeft, ChevronRight } from 'lucide-react'
import Badge from '../components/Badge'
import ProductGrid from '../components/ProductGrid'
import useCart from '../hooks/useCart'
import products from '../data/products.json'

const SIZE_GUIDE = {
  '0-3m': { altura: '50-60 cm', peso: '3-6 kg' },
  '3-6m': { altura: '60-67 cm', peso: '6-8 kg' },
  '6-9m': { altura: '67-72 cm', peso: '8-9.5 kg' },
  '9-12m': { altura: '72-80 cm', peso: '9.5-11 kg' },
  '12-18m': { altura: '80-86 cm', peso: '11-13 kg' },
  'RN': { altura: '< 50 cm', peso: '< 3 kg' },
  'unico': { altura: 'Talle único', peso: '—' },
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()

  const [mainImage, setMainImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-16">
        <p className="text-5xl">🧸</p>
        <h2 className="font-display font-bold text-cacao text-2xl">
          Producto no encontrado
        </h2>
        <Link
          to="/catalogo"
          className="bg-rosa text-cacao font-display font-bold px-6 py-3 rounded-2xl hover:bg-rosa-dark transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes[0] !== 'unico') {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    const size = selectedSize || product.sizes[0]
    setAdding(true)
    addToCart(product, size, quantity)
    setTimeout(() => setAdding(false), 800)
  }

  const images = product.images || [product.image]

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1 text-xs font-body text-arena mb-8">
          <Link to="/" className="hover:text-cacao transition-colors">Inicio</Link>
          <ChevronRight size={12} />
          <Link to="/catalogo" className="hover:text-cacao transition-colors">Catálogo</Link>
          <ChevronRight size={12} />
          <span className="text-cacao capitalize">{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-cacao line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="rounded-3xl overflow-hidden bg-cream aspect-square mb-3 shadow-soft">
              <motion.img
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-colors ${
                      mainImage === i ? 'border-cacao' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNew && <Badge variant="lila">Nuevo</Badge>}
              {product.discount > 0 && (
                <Badge variant="rosa">-{product.discount}% OFF</Badge>
              )}
              {product.stock ? (
                <Badge variant="menta">En stock</Badge>
              ) : (
                <Badge variant="arena">Sin stock</Badge>
              )}
            </div>

            <h1 className="font-display font-black text-cacao text-3xl sm:text-4xl mb-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-rosa-dark text-rosa-dark'
                        : 'fill-arena/30 text-arena/30'
                    }
                  />
                ))}
              </div>
              <span className="font-body text-sm text-arena">
                {product.rating} · {product.reviews} reseñas
              </span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="font-display font-black text-cacao text-4xl">
                ${product.price.toLocaleString('es-AR')}
              </span>
              {product.discount > 0 && (
                <span className="font-body text-arena text-lg line-through mb-1">
                  ${product.originalPrice.toLocaleString('es-AR')}
                </span>
              )}
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-semibold text-cacao text-sm">
                  Talle
                </p>
                {sizeError && (
                  <span className="text-xs text-red-400 animate-pulse">
                    Seleccioná un talle
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl font-body text-sm transition-all ${
                      selectedSize === s
                        ? 'bg-cacao text-cream font-semibold scale-105'
                        : 'border-2 border-arena/30 text-cacao hover:border-cacao'
                    } ${sizeError && !selectedSize ? 'border-red-300' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="font-display font-semibold text-cacao text-sm mb-2">
                  Color: <span className="font-normal text-arena capitalize">{selectedColor || product.colors[0]}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-body capitalize border-2 transition-all ${
                        (selectedColor || product.colors[0]) === c
                          ? 'border-cacao bg-cream font-semibold'
                          : 'border-arena/20 text-arena hover:border-cacao'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="font-display font-semibold text-cacao text-sm mb-2">Cantidad</p>
              <div className="flex items-center gap-2 bg-cream rounded-2xl border border-rosa/40 w-fit px-1 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl hover:bg-rosa/30 transition-colors font-bold text-cacao flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-10 text-center font-display font-bold text-cacao text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl hover:bg-rosa/30 transition-colors font-bold text-cacao flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.stock || adding}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-3xl font-display font-bold text-lg transition-all active:scale-95 ${
                adding
                  ? 'bg-menta text-cacao'
                  : product.stock
                  ? 'bg-cacao text-cream hover:bg-cacao/80'
                  : 'bg-arena/20 text-arena cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={20} />
              {adding ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </button>

            <div className="mt-6 p-4 bg-menta/20 rounded-2xl">
              <p className="font-body text-sm text-cacao">
                🚚 Envío gratis en compras +$15.000 · 📦 Despacho en 24 hs · 🔄 Cambios sin cargo
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-display font-semibold text-cacao mb-2">Descripción</h3>
              <p className="font-body text-arena text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 bg-white rounded-3xl p-6 shadow-soft">
          <h3 className="font-display font-bold text-cacao text-lg mb-4">
            Guía de talles
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-rosa/30">
                  <th className="text-left py-2 pr-6 font-display font-bold text-cacao">Talle</th>
                  <th className="text-left py-2 pr-6 font-display font-bold text-cacao">Altura</th>
                  <th className="text-left py-2 font-display font-bold text-cacao">Peso</th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((s) => (
                  <tr key={s} className={`border-b border-rosa/20 ${selectedSize === s ? 'bg-rosa/10' : ''}`}>
                    <td className="py-2 pr-6 font-semibold text-cacao">{s}</td>
                    <td className="py-2 pr-6 text-arena">{SIZE_GUIDE[s]?.altura || '—'}</td>
                    <td className="py-2 text-arena">{SIZE_GUIDE[s]?.peso || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-black text-cacao text-2xl sm:text-3xl">
                También te puede gustar
              </h2>
              <Link
                to={`/catalogo?categoria=${product.category}`}
                className="font-display font-bold text-sm text-arena hover:text-cacao transition-colors"
              >
                Ver más →
              </Link>
            </div>
            <ProductGrid products={related} cols={4} />
          </section>
        )}
      </div>
    </main>
  )
}
