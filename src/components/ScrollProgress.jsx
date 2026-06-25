import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(Math.min(1, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[35] h-1 bg-rosa/20">
      <motion.div
        className="h-full bg-gradient-to-r from-rosa via-lila to-menta rounded-r-full"
        style={{ scaleX: progress, originX: 0 }}
      />
    </div>
  )
}
