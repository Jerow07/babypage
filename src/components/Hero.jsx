import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { useRef } from 'react'
import products from '../data/products.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const FLOATING_PRODUCTS = [
  { product: products[0], x: '65%', y: '12%', rotate: -6, delay: 0 },
  { product: products[2], x: '78%', y: '42%', rotate: 4, delay: 0.15 },
  { product: products[5], x: '58%', y: '65%', rotate: -3, delay: 0.3 },
]

function FloatingProductCard({ product, x, y, rotate, delay, parallaxY }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.6 + delay }}
      style={{ left: x, top: y, y: parallaxY }}
      className="absolute hidden lg:block w-44 z-20 pointer-events-none"
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 3 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
        className="bg-white rounded-3xl p-3 shadow-card"
      >
        <div className="rounded-2xl overflow-hidden aspect-square mb-2 bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-display font-semibold text-cacao text-xs leading-tight line-clamp-1 mb-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display font-black text-cacao text-sm">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <div className="flex items-center gap-0.5">
            <Star size={10} className="fill-rosa-dark text-rosa-dark" />
            <span className="text-[10px] text-arena">{product.rating}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, -80])
  const parallaxCards = useTransform(scrollYProgress, [0, 1], [0, -120])
  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-rosa/20 to-lila/20 pt-16"
    >
      <motion.div style={{ y: parallaxBg }} className="absolute inset-0">
        <DecoBackground />
      </motion.div>

      {FLOATING_PRODUCTS.map((fp) => (
        <FloatingProductCard key={fp.product.id} {...fp} parallaxY={parallaxCards} />
      ))}

      <motion.div
        style={{ y: parallaxText }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-16"
      >
        <div className="max-w-xl">
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles size={16} className="text-lila-dark" />
            </motion.div>
            <span className="font-body text-sm text-arena tracking-wide uppercase">
              Colección 2025 · Algodón orgánico
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-display font-black text-cacao text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6"
          >
            Todo el amor{' '}
            <span className="relative inline-block">
              en cada
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: 'easeInOut' }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8 Q50 2 100 8 Q150 14 198 6"
                  stroke="#F7C5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </motion.svg>
            </span>{' '}
            puntada
          </motion.h1>

          <motion.p
            {...fadeUp(0.35)}
            className="font-body text-arena text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
          >
            Ropa de bebé hecha con amor y algodón orgánico certificado.
            Porque la piel más suave del mundo merece lo mejor.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-cacao text-cream font-display font-bold text-base px-8 py-4 rounded-2xl hover:bg-cacao/80 transition-colors"
              >
                Ver Colección
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/catalogo?nuevo=true"
                className="inline-flex items-center justify-center gap-2 bg-rosa text-cacao font-display font-bold text-base px-8 py-4 rounded-2xl hover:bg-rosa-dark transition-colors"
              >
                Novedades
                <Sparkles size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="flex items-center gap-8 mt-12">
            {[
              { value: '+500', label: 'familias felices' },
              { value: '100%', label: 'algodón orgánico' },
              { value: '24hs', label: 'envío express' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-display font-black text-cacao text-2xl">{s.value}</p>
                <p className="font-body text-arena text-xs">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-arena/60"
        >
          <div className="w-5 h-8 rounded-full border-2 border-arena/40 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-arena/60"
            />
          </div>
          <span className="font-body text-xs">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

function DecoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[5%] top-[15%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-rosa/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[25%] bottom-[10%] w-56 h-56 rounded-full bg-lila/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [-8, 12, -8], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[10%] top-[50%] w-40 h-40 rounded-full bg-menta/25 blur-2xl"
      />

      {[
        { left: '15%', top: '20%', size: 8, color: '#D8C5F0', d: 3 },
        { left: '80%', top: '70%', size: 10, color: '#F7C5CC', d: 4 },
        { left: '25%', top: '75%', size: 6, color: '#C5E8D5', d: 2 },
        { left: '70%', top: '15%', size: 7, color: '#D8C5F0', d: 5 },
        { left: '5%', top: '55%', size: 5, color: '#F7C5CC', d: 3.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: s.d, repeat: Infinity, delay: i * 0.6 }}
          className="absolute rounded-full"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, background: s.color }}
        />
      ))}
    </div>
  )
}
