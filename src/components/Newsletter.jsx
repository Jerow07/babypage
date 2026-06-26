import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

function Confetti({ active }) {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: ['#F7C5CC','#D8C5F0','#C5E8D5','#F7C5CC','#D8C5F0'][i % 5],
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 200 + 100),
    rotate: Math.random() * 360,
    size: Math.random() * 8 + 4,
  }))

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-4xl">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate, scale: 0 }}
              exit={{}}
              transition={{ duration: 1.2, ease: 'easeOut', delay: p.id * 0.02 }}
              className="absolute left-1/2 top-1/2 rounded-sm"
              style={{ width: p.size, height: p.size, background: p.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSent(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1500)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <div className="relative bg-gradient-to-br from-cacao to-cacao/80 rounded-4xl p-10 sm:p-14 text-center overflow-hidden">
        <Confetti active={confetti} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-15, 15, -15], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
              className="absolute rounded-full blur-2xl"
              style={{
                width: 80 + i * 20,
                height: 80 + i * 20,
                left: `${10 + i * 15}%`,
                top: `${10 + (i % 2) * 60}%`,
                background: ['#F7C5CC','#D8C5F0','#C5E8D5','#B8E4F0'][i % 4],
                opacity: 0.08,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-rosa/20 flex items-center justify-center">
                <Sparkles size={22} className="text-rosa" />
              </div>
            </div>
            <h2 className="font-display font-black text-cream text-3xl sm:text-4xl mb-3">
              ¿Te quedás con nosotros?
            </h2>
            <p className="font-body text-cream/70 text-base sm:text-lg mb-8 max-w-md mx-auto">
              Suscribite y recibí un <span className="text-rosa font-semibold">10% de descuento</span> en tu primera compra, novedades exclusivas y tips de cuidado.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className={`flex-1 relative transition-all duration-200 ${focused ? 'scale-105' : ''}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-cream placeholder-cream/40 font-body focus:outline-none focus:border-rosa focus:bg-white/15 transition-all"
                    aria-label="Email"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-rosa hover:bg-rosa-dark text-cacao font-display font-bold px-7 py-4 rounded-2xl transition-colors whitespace-nowrap"
                >
                  <Send size={16} />
                  ¡Quiero mi descuento!
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <p className="text-5xl mb-3">🌸</p>
                <p className="font-display font-bold text-cream text-2xl mb-1">
                  ¡Ya sos parte de Nubecitta!
                </p>
                <p className="font-body text-cream/60">
                  Revisá tu casilla — te mandamos el código de descuento.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-body text-cream/30 text-xs mt-5">
            Sin spam. Podés darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  )
}
