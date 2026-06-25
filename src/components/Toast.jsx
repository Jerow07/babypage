import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-cacao text-cream px-4 py-3 rounded-2xl shadow-card flex items-center gap-3 max-w-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-rosa/30 flex items-center justify-center flex-shrink-0">
            <ShoppingBag size={16} className="text-cream" />
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-tight">
              ¡Agregado al carrito!
            </p>
            <p className="font-body text-cream/70 text-xs line-clamp-1">
              {toast.product.name} · {toast.size}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
