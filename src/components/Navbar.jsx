import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import useCart from '../hooks/useCart'

const categories = [
  { label: 'Bodies', value: 'bodies' },
  { label: 'Pijamas', value: 'pijamas' },
  { label: 'Conjuntos', value: 'conjuntos' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Calzado', value: 'calzado' },
]

export default function Navbar() {
  const { itemCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const closeTimer = useRef(null)

  const openCat = () => {
    clearTimeout(closeTimer.current)
    setCatOpen(true)
  }
  const closeCat = () => {
    closeTimer.current = setTimeout(() => setCatOpen(false), 150)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `font-body font-medium text-sm transition-colors ${
      isActive ? 'text-cacao' : 'text-arena hover:text-cacao'
    }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
          <Logo size="sm" />

          <div className="hidden md:flex items-center gap-6 ml-8">
            <NavLink to="/" className={linkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className={linkClass}>
              Catálogo
            </NavLink>

            <div className="relative" onMouseEnter={openCat} onMouseLeave={closeCat}>
              <button
                className="flex items-center gap-1 font-body font-medium text-sm text-arena hover:text-cacao transition-colors py-1"
                aria-haspopup="true"
                aria-expanded={catOpen}
              >
                Categorías <ChevronDown size={14} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    onMouseEnter={openCat}
                    onMouseLeave={closeCat}
                    className="absolute top-full left-0 pt-2 min-w-[160px]"
                  >
                    <div className="bg-cream rounded-2xl shadow-card border border-rosa/30 py-2">
                      {categories.map((c) => (
                        <Link
                          key={c.value}
                          to={`/catalogo?categoria=${c.value}`}
                          className="block px-4 py-2.5 text-sm font-body text-arena hover:text-cacao hover:bg-rosa/20 transition-colors"
                          onClick={() => setCatOpen(false)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/#nosotros"
              className="font-body font-medium text-sm text-arena hover:text-cacao transition-colors"
            >
              Sobre nosotros
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/catalogo"
              className="p-2 rounded-2xl hover:bg-rosa/30 transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} className="text-cacao" />
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 rounded-2xl hover:bg-rosa/30 transition-colors"
              aria-label={`Carrito - ${itemCount} productos`}
            >
              <ShoppingBag size={20} className="text-cacao" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rosa text-cacao text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-2xl hover:bg-rosa/30 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={20} className="text-cacao" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-cacao/40 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed left-0 top-0 h-full w-72 bg-cream z-50 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-2xl hover:bg-rosa/30"
                  aria-label="Cerrar menú"
                >
                  <X size={20} className="text-cacao" />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {[
                  { to: '/', label: 'Inicio' },
                  { to: '/catalogo', label: 'Catálogo' },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-body font-medium text-cacao text-lg py-3 border-b border-rosa/30 hover:text-rosa-dark transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="font-display font-semibold text-arena text-sm mt-4 mb-2">
                  Categorías
                </p>
                {categories.map((c) => (
                  <Link
                    key={c.value}
                    to={`/catalogo?categoria=${c.value}`}
                    className="font-body text-cacao py-2 pl-3 hover:text-rosa-dark transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
