import { useState, useCallback } from 'react'
import useCartStore from '../store/cartStore'

export default function useCart() {
  const store = useCartStore()
  const [toast, setToast] = useState(null)

  const addToCart = useCallback(
    (product, size, quantity = 1) => {
      store.addItem(product, size, quantity)
      setToast({ product, size })
      setTimeout(() => setToast(null), 3000)
    },
    [store]
  )

  const total = store.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  const itemCount = store.items.reduce((sum, i) => sum + i.quantity, 0)

  return {
    items: store.items,
    isOpen: store.isOpen,
    openCart: store.openCart,
    closeCart: store.closeCart,
    toggleCart: store.toggleCart,
    addToCart,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    total,
    itemCount,
    toast,
  }
}
