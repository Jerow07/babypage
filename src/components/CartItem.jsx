import { Minus, Plus, Trash2 } from 'lucide-react'
import useCart from '../hooks/useCart'

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart()
  const { product, size, quantity, key } = item

  return (
    <div className="flex gap-3 py-4 border-b border-rosa/30">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-2xl flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-cacao text-sm leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-arena text-xs mt-0.5">Talle: {size}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 bg-cream rounded-xl border border-rosa/40">
            <button
              onClick={() => updateQuantity(key, quantity - 1)}
              className="p-1.5 hover:bg-rosa/30 rounded-xl transition-colors"
              aria-label="Restar cantidad"
            >
              <Minus size={12} className="text-cacao" />
            </button>
            <span className="w-6 text-center text-sm font-display font-bold text-cacao">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(key, quantity + 1)}
              className="p-1.5 hover:bg-rosa/30 rounded-xl transition-colors"
              aria-label="Sumar cantidad"
            >
              <Plus size={12} className="text-cacao" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-cacao text-sm">
              ${(product.price * quantity).toLocaleString('es-AR')}
            </span>
            <button
              onClick={() => removeItem(key)}
              className="p-1.5 hover:bg-rosa/30 rounded-xl transition-colors text-arena hover:text-cacao"
              aria-label="Eliminar producto"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
