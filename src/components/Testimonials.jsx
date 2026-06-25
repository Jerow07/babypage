import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Valentina M.',
    location: 'Buenos Aires',
    avatar: 'V',
    color: 'bg-rosa',
    rating: 5,
    text: 'Compré el pijama osito lila y es lo más suave que toqué en mi vida. Mi bebé duerme feliz y yo también. ¡Ya pedí tres más en distintos colores!',
    product: 'Pijama Osito Lila',
  },
  {
    id: 2,
    name: 'Luciana P.',
    location: 'Córdoba',
    avatar: 'L',
    color: 'bg-lila',
    rating: 5,
    text: 'La calidad es increíble. Los bodies aguantan mil lavados y siguen suaves. El envío llegó en dos días. ¡Nubecitta es mi marca favorita para Sofía!',
    product: 'Body Algodón Rosado',
  },
  {
    id: 3,
    name: 'Camila R.',
    location: 'Rosario',
    avatar: 'C',
    color: 'bg-menta',
    rating: 5,
    text: 'El vestidito floral es una obra de arte. Lo regalé y la mamá me preguntó tres veces dónde lo compré. El packaging también es hermoso, muy cuidado.',
    product: 'Vestidito Rosa Floral',
  },
  {
    id: 4,
    name: 'Florencia G.',
    location: 'Mendoza',
    avatar: 'F',
    color: 'bg-rosa',
    rating: 5,
    text: 'Pedí el conjunto tejido para el invierno y superó todas mis expectativas. El tejido es artesanal de verdad, se nota el amor en cada puntada.',
    product: 'Conjunto Tejido Beige',
  },
  {
    id: 5,
    name: 'Martina S.',
    location: 'Mar del Plata',
    avatar: 'M',
    color: 'bg-lila',
    rating: 5,
    text: 'La atención al cliente es excelente. Tuve un problema con el talle y me lo cambiaron sin ningún cargo. Eso habla muy bien de la marca. ¡Muy recomendable!',
    product: 'Set Gorrito + Escarpines',
  },
  {
    id: 6,
    name: 'Rocío T.',
    location: 'La Plata',
    avatar: 'R',
    color: 'bg-menta',
    rating: 5,
    text: 'El algodón orgánico se nota desde el primer momento. Mi pediatra me recomendó ropa orgánica y elegí Nubecitta. No me arrepiento para nada.',
    product: 'Body Manga Larga Blanco',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 4500)
    return () => clearInterval(intervalRef.current)
  }, [paused, current])

  const t = TESTIMONIALS[current]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="font-body text-sm text-arena uppercase tracking-widest mb-2">Testimonios</p>
        <h2 className="font-display font-black text-cacao text-3xl sm:text-4xl">
          Lo que dicen las mamás
        </h2>
      </motion.div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-4xl p-8 sm:p-12 shadow-card"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className={`${t.color} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-display font-black text-cacao`}>
                  {t.avatar}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex justify-center sm:justify-start gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-rosa-dark text-rosa-dark" />
                    ))}
                  </div>
                  <p className="font-body text-cacao text-lg sm:text-xl leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-display font-bold text-cacao">{t.name}</p>
                    <p className="font-body text-arena text-sm">{t.location} · Compró: {t.product}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-rosa/20 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} className="text-cacao" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-rosa/20 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} className="text-cacao" />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-cacao' : 'w-2 h-2 bg-arena/40'
              }`}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
