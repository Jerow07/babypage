import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-rosa/20 to-lila/20 pt-16">
      <DecoBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="max-w-2xl">
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-lila-dark" />
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
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8 Q50 2 100 8 Q150 14 198 6"
                  stroke="#F7C5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
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

          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-cacao text-cream font-display font-bold text-base px-8 py-4 rounded-2xl hover:bg-cacao/80 transition-all hover:scale-105 active:scale-95"
            >
              Ver Colección
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/catalogo?nuevo=true"
              className="inline-flex items-center justify-center gap-2 bg-rosa text-cacao font-display font-bold text-base px-8 py-4 rounded-2xl hover:bg-rosa-dark transition-all hover:scale-105 active:scale-95"
            >
              Novedades
              <Sparkles size={16} />
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.65)}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { value: '+500', label: 'familias felices' },
              { value: '100%', label: 'algodón orgánico' },
              { value: '12m', label: 'garantía de calidad' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-black text-cacao text-xl">
                  {s.value}
                </p>
                <p className="font-body text-arena text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DecoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[5%] top-[15%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-rosa/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[25%] bottom-[10%] w-56 h-56 rounded-full bg-lila/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[10%] top-[50%] w-40 h-40 rounded-full bg-menta/25 blur-2xl"
      />

      <svg
        className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 opacity-20 hidden sm:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="60" r="40" fill="#F7C5CC" />
        <circle cx="70" cy="80" r="30" fill="#F7C5CC" />
        <circle cx="130" cy="80" r="25" fill="#F7C5CC" />
        <ellipse cx="100" cy="110" rx="60" ry="30" fill="#F7C5CC" />
        <polygon points="140,20 143,30 153,30 145,36 148,46 140,40 132,46 135,36 127,30 137,30" fill="#D8C5F0" />
        <circle cx="40" cy="30" r="3" fill="#D8C5F0" opacity="0.7" />
        <circle cx="160" cy="150" r="4" fill="#D8C5F0" opacity="0.7" />
        <circle cx="20" cy="120" r="2.5" fill="#C5E8D5" opacity="0.8" />
        <circle cx="170" cy="40" r="2" fill="#C5E8D5" opacity="0.8" />
      </svg>

      {[
        { cx: 80, cy: 30, r: 2 },
        { cx: 120, cy: 170, r: 3 },
        { cx: 30, cy: 90, r: 1.5 },
        { cx: 180, cy: 100, r: 2.5 },
      ].map((star, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-2 h-2 rounded-full bg-lila"
          style={{ left: `${star.cx / 2}%`, top: `${star.cy / 2}%` }}
        />
      ))}
    </div>
  )
}
