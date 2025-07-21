import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoriesApi } from '@/api/categories'
import type { EcwidCategory } from '@/types/ecwid'

const CACHE_DURATION = 5 * 60 * 1000

export function getSlugFromUrl(url: string): string {
  const parts = url.split('/')
  return parts[parts.length - 1] || ''
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<EcwidCategory[]>([])
  const lastFetchTime = ref(0)

  const fetchAllCategories = async (force = false): Promise<EcwidCategory[]> => {
    const now = Date.now()
    if (!force && categories.value && now - lastFetchTime.value < CACHE_DURATION) {
      return categories.value
    }

    const response = await categoriesApi.getAll()
    categories.value = response.items
    lastFetchTime.value = now
    return categories.value
  }

  const getCategoryByPath = async (parentSlug: string | null, slug: string) => {
    const cats = await fetchAllCategories()
    const target = cats.find(cat => getSlugFromUrl(cat.url) === slug)
    if (!target) return null

    if (!parentSlug) return target.parentId ? null : target

    const parent = cats.find(cat => cat.id === target.parentId)
    if (parent && getSlugFromUrl(parent.url) === parentSlug) {
      return target
    }

    return null
  }

  const getSubcategories = async (parentId: number) => {
    const cats = await fetchAllCategories()
    return cats.filter(cat => cat.parentId === parentId)
  }

  const getTopLevelCategories = async () => {
    const cats = await fetchAllCategories()
    return cats.filter(cat => !cat.parentId)
  }

  const getCategoryBreadcrumb = async (categoryId: number) => {
    const cats = await fetchAllCategories()
    const breadcrumb: EcwidCategory[] = []

    let current = cats.find(cat => cat.id === categoryId)
    while (current) {
      breadcrumb.unshift(current)
      current = current.parentId ? cats.find(c => c.id === current!.parentId) : undefined
    }

    return breadcrumb
  }

  const getCategoryUrl = (category: EcwidCategory, parentCategory?: EcwidCategory | null) => {
    const slug = getSlugFromUrl(category.url)
    if (parentCategory || category.parentId) {
      const parent = parentCategory || categories.value?.find(c => c.id === category.parentId)
      if (parent) {
        const parentSlug = getSlugFromUrl(parent.url)
        return `/category/${parentSlug}/${slug}`
      }
    }
    return `/category/${slug}`
  }

  return {
    categories,
    fetchAllCategories,
    getCategoryByPath,
    getSubcategories,
    getTopLevelCategories,
    getCategoryBreadcrumb,
    getCategoryUrl
  }
})
