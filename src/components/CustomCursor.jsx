import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState([])
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const idRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      const p = { x: e.clientX, y: e.clientY }
      setPos(p)

      idRef.current += 1
      const id = idRef.current
      setTrail((t) => [...t.slice(-8), { ...p, id }])
      setTimeout(() => setTrail((t) => t.filter((pt) => pt.id !== id)), 600)
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const enter = (e) => {
      if (e.target.closest('a, button, [role="button"]')) setHovering(true)
    }
    const leave = () => setHovering(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)

    document.body.style.cursor = 'none'
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      {trail.map((pt, i) => (
        <motion.div
          key={pt.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed pointer-events-none z-[200]"
          style={{ left: pt.x - 4, top: pt.y - 4 }}
        >
          <svg width="8" height="8" viewBox="0 0 10 10">
            <polygon
              points="5,0 6,3.5 10,3.5 7,6 8,10 5,7.5 2,10 3,6 0,3.5 4,3.5"
              fill={['#F7C5CC','#D8C5F0','#C5E8D5'][i % 3]}
              opacity={0.7 - i * 0.07}
            />
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="fixed pointer-events-none z-[201]"
        style={{ left: pos.x - 16, top: pos.y - 16 }}
        animate={{ scale: clicking ? 0.7 : hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <ellipse cx="16" cy="22" rx="12" ry="7" fill="#F7C5CC" opacity="0.9" />
          <ellipse cx="10" cy="17" rx="6" ry="6" fill="#F7C5CC" opacity="0.9" />
          <ellipse cx="19" cy="15" rx="8" ry="8" fill="#F7C5CC" opacity="0.9" />
          <ellipse cx="16" cy="22" rx="12" ry="6" fill="#F7C5CC" />
          <polygon
            points="22,6 23.5,10.5 28,10.5 24.5,13 25.5,18 22,15 18.5,18 19.5,13 16,10.5 20.5,10.5"
            fill="#D8C5F0"
          />
        </svg>
      </motion.div>
    </>
  )
}
