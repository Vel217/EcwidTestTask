import { ref, computed, watch } from 'vue'
import type { CartItem, EcwidProduct } from '@/types/ecwid'

const CART_STORAGE_KEY = 'ecwid-cart'

const cartItems = ref<CartItem[]>([])

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      cartItems.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error)
    cartItems.value = []
  }
}

const saveCartToStorage = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

loadCartFromStorage()

watch(cartItems, saveCartToStorage, { deep: true })

export const useCart = () => {
  const addToCart = (
    product: EcwidProduct,
    quantity: number = 1,
    selectedOptions?: Record<string, string>
  ) => {
    const existingItem = cartItems.value.find(item => {
      if (item.product.id !== product.id) return false

      const itemOptionsStr = JSON.stringify(item.selectedOptions || {})
      const newOptionsStr = JSON.stringify(selectedOptions || {})
      return itemOptionsStr === newOptionsStr
    })

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity, selectedOptions })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)
  })

  const totalPriceFormatted = computed(() => {
    return `$${totalPrice.value.toFixed(2)}`
  })

  return {
    cartItems: computed(() => cartItems.value),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalPriceFormatted
  }
}
