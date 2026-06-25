import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Truck } from 'lucide-react'
import useCart from '../hooks/useCart'
import CartItem from './CartItem'

export default function Cart() {
  const { items, isOpen, closeCart, total, itemCount } = useCart()
  const [showModal, setShowModal] = useState(false)
  const freeShipping = total >= 15000

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cacao/40 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-cream z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Carrito de compras"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-rosa/30">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-cacao" />
                <h2 className="font-display font-bold text-cacao text-lg">
                  Mi carrito
                </h2>
                {itemCount > 0 && (
                  <span className="bg-rosa text-cacao text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-rosa/30 rounded-2xl transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} className="text-cacao" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-rosa/30 flex items-center justify-center">
                  <ShoppingBag size={32} className="text-rosa-dark" />
                </div>
                <p className="font-display font-semibold text-cacao text-lg">
                  Tu carrito está vacío
                </p>
                <p className="text-arena text-sm">
                  Agregá productos y volvé acá para verlos
                </p>
                <button
                  onClick={closeCart}
                  className="bg-rosa hover:bg-rosa-dark text-cacao font-display font-bold px-6 py-3 rounded-2xl transition-colors mt-2"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`mx-4 mt-3 px-3 py-2 rounded-2xl flex items-center gap-2 text-xs font-body ${
                    freeShipping
                      ? 'bg-menta text-cacao'
                      : 'bg-arena/20 text-arena'
                  }`}
                >
                  <Truck size={14} />
                  {freeShipping
                    ? '¡Envío gratis incluido!'
                    : `Te faltan $${(15000 - total).toLocaleString('es-AR')} para envío gratis`}
                </div>

                <div className="flex-1 overflow-y-auto px-5">
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-rosa/30 bg-cream">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-body text-arena">Total</span>
                    <span className="font-display font-bold text-cacao text-xl">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-cacao hover:bg-cacao/80 text-cream font-display font-bold py-4 rounded-2xl transition-colors text-lg"
                  >
                    Finalizar compra
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-cacao/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-cream rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
          >
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="font-display font-bold text-cacao text-2xl mb-2">
              ¡Próximamente!
            </h3>
            <p className="text-arena font-body mb-6">
              Estamos preparando el checkout. Muy pronto podrás completar tu compra.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-rosa hover:bg-rosa-dark text-cacao font-display font-bold px-8 py-3 rounded-2xl transition-colors"
            >
              Volver al carrito
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
