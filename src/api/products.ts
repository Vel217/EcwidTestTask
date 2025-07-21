import api from '@/api/config'
import type { ProductResponse, EcwidProduct } from '@/types/ecwid'

export const productsApi = {
  async getAll(categoryId?: number, limit = 100): Promise<ProductResponse> {
    try {
      const params: Record<string, boolean | number> = {
        enabled: true,
        limit
      }
      if (categoryId) {
        params.categories = categoryId
      }
      const response = await api.get<ProductResponse>('products', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getById(id: number): Promise<EcwidProduct> {
    try {
      const response = await api.get<EcwidProduct>(`products/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      throw error
    }
  }
}
