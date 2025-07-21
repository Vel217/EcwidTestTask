import api from '@/api/config'
import type { CategoryResponse, EcwidCategory } from '@/types/ecwid'

export const categoriesApi = {
  async getAll(parentId = 0): Promise<CategoryResponse> {
    try {
      const response = await api.get<CategoryResponse>('categories', {
        params: {
          parentId,
          enabled: true
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  async getById(id: number): Promise<EcwidCategory> {
    try {
      const response = await api.get<EcwidCategory>(`categories/${id}`, {})
      return response.data
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error)
      throw error
    }
  }
}
