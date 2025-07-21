import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/api/products'
import type { EcwidProduct } from '@/types/ecwid'

export const useProductStore = defineStore('product', () => {
  const products = ref<EcwidProduct[]>([])
  const productCache = ref<Map<number, EcwidProduct>>(new Map())

  const fetchAllProducts = async () => {
    const response = await productsApi.getAll()
    products.value = response.items
  }

  const getProductById = async (id: number): Promise<EcwidProduct> => {
    if (productCache.value.has(id)) {
      return productCache.value.get(id)!
    }

    const product = await productsApi.getById(id)
    productCache.value.set(id, product)
    return product
  }

  const getRecommended = async (product: EcwidProduct, limit = 4) => {
    if (!product.categoryIds.length) return []

    const related = await productsApi.getAll(product.categoryIds[0], limit + 1)
    return related.items.filter(p => p.id !== product.id).slice(0, limit)
  }

  return {
    products,
    fetchAllProducts,
    getProductById,
    getRecommended
  }
})
