import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck, RefreshCw, Leaf, Star } from 'lucide-react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

const CATEGORY_ICONS = [
  { label: 'Bodies', value: 'bodies', emoji: '👶', color: 'bg-rosa/30' },
  { label: 'Pijamas', value: 'pijamas', emoji: '🌙', color: 'bg-lila/30' },
  { label: 'Conjuntos', value: 'conjuntos', emoji: '✨', color: 'bg-menta/30' },
  { label: 'Accesorios', value: 'accesorios', emoji: '🎀', color: 'bg-rosa/30' },
]

export default function Home() {
  const [loading, setLoading] = useState(true)
  const featured = products.filter((p) => p.isFeatured)
  const newest = products.filter((p) => p.isNew)
  const scrollRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <main>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-black text-cacao text-3xl sm:text-4xl mb-2">
            Explorá por categoría
          </h2>
          <p className="font-body text-arena">Todo lo que tu bebé necesita</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORY_ICONS.map((cat, i) => (
            <motion.div
              key={cat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/catalogo?categoria=${cat.value}`}
                className={`${cat.color} rounded-3xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-200 group`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="font-display font-bold text-cacao text-base">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-cacao text-3xl sm:text-4xl">
              Destacados
            </h2>
            <p className="font-body text-arena mt-1">Los más amados por las familias</p>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:inline-flex font-display font-bold text-sm text-cacao border-b-2 border-rosa hover:border-cacao transition-colors"
          >
            Ver todo →
          </Link>
        </div>
        <ProductGrid products={featured} loading={loading} cols={4} />
      </section>

      <section className="bg-gradient-to-r from-rosa/40 via-cream to-lila/30 py-10 mx-4 sm:mx-6 rounded-4xl mb-16 max-w-6xl sm:mx-auto">
        <div className="flex items-center justify-center gap-3 px-6">
          <Truck size={22} className="text-cacao flex-shrink-0" />
          <p className="font-display font-bold text-cacao text-base sm:text-lg text-center">
            Envío gratis en compras mayores a{' '}
            <span className="text-cacao underline decoration-rosa underline-offset-2">
              $15.000
            </span>{' '}
            · Todo el país
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-cacao text-3xl sm:text-4xl">
              Novedades
            </h2>
            <p className="font-body text-arena mt-1">Recién llegados a nuestra cueva</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {newest.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-60 sm:w-72"
            >
              <Link to={`/producto/${product.id}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-shadow group">
                  <div className="relative overflow-hidden aspect-square bg-cream">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-lila text-cacao text-xs font-bold rounded-full px-2 py-0.5">
                      Nuevo
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-display font-semibold text-cacao text-sm mb-1 line-clamp-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={11} className="fill-rosa-dark text-rosa-dark" />
                      <span className="text-xs text-arena">{product.rating}</span>
                    </div>
                    <p className="font-display font-bold text-cacao">
                      ${product.price.toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16" id="nosotros">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Leaf size={28} className="text-menta-dark" />,
              bg: 'bg-menta/30',
              title: 'Algodón orgánico',
              desc: 'Certificado GOTS. Sin químicos ni tóxicos. Suave para la piel más sensible.',
            },
            {
              icon: <Truck size={28} className="text-rosa-dark" />,
              bg: 'bg-rosa/30',
              title: 'Envíos rápidos',
              desc: 'Despachamos en 24 hs. Seguimiento en tiempo real. Todo el país.',
            },
            {
              icon: <RefreshCw size={28} className="text-lila-dark" />,
              bg: 'bg-lila/30',
              title: 'Cambios sin costo',
              desc: 'Si no es el talle exacto, lo cambiamos sin cargo. Tu tranquilidad primero.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${item.bg} rounded-3xl p-8 text-center`}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-cacao text-lg mb-2">
                {item.title}
              </h3>
              <p className="font-body text-arena text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
