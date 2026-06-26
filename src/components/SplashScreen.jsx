import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 1800)
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          >
            <Logo size="lg" showTagline />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="mt-8 w-40 h-1 rounded-full bg-gradient-to-r from-rosa via-lila via-celeste to-menta"
          />

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -40 - i * 8] }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: `${30 + i * 6}%`,
                top: '55%',
                background: ['#F7C5CC','#D8C5F0','#C5E8D5','#B8E4F0','#F7C5CC','#D8C5F0','#B8E4F0','#C5E8D5'][i],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
