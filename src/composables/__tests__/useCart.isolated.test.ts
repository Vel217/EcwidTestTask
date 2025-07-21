import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from '@/composables/useCart'
import type { EcwidProduct } from '@/types/ecwid'

const mockProduct: EcwidProduct = {
  id: 1,
  sku: 'TEST-001',
  name: 'Test Product',
  url: 'test-product',
  price: 19.99,
  defaultDisplayedPrice: 19.99,
  defaultDisplayedPriceFormatted: '$19.99',
  enabled: true,
  unlimited: true,
  inStock: true,
  categories: [1],
  categoryIds: [1],
  quantity: 10
}

describe('useCart basic functionality', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should work with cart operations', () => {
    const { addToCart, cartItems, totalItems, clearCart } = useCart()

    clearCart()

    addToCart(mockProduct)
    expect(cartItems.value).toHaveLength(1)
    expect(totalItems.value).toBe(1)

    clearCart()
  })
})
