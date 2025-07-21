<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-8">
      <p>{{ error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="loadData"
      >
        {{ t('common.tryAgain') }}
      </button>
    </div>

    <div v-else>
      <nav class="mb-6 flex items-center space-x-2 text-sm text-gray-600">
        <router-link :to="{ name: ROUTE_NAMES.HOME }" class="hover:text-blue-600">
          {{ t('common.home') }}
        </router-link>
        <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id">
          <span>/</span>
          <router-link
            v-if="index < breadcrumbs.length - 1"
            :to="getCategoryLink(breadcrumb)"
            class="hover:text-blue-600"
          >
            {{ breadcrumb.name }}
          </router-link>
          <span v-else class="text-gray-900">{{ breadcrumb.name }}</span>
        </template>
      </nav>

      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ category?.name || 'Category' }}
      </h1>

      <section v-if="subcategories.length > 0" class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          {{ t('common.subcategories') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CategoryCard
            v-for="subcategory in subcategories"
            :key="subcategory.id"
            :category="subcategory"
            :parent-category="category"
          />
        </div>
      </section>

      <section v-if="products.length > 0">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          {{ t('common.products') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </section>

      <div
        v-if="subcategories.length === 0 && products.length === 0"
        class="text-center py-12 text-gray-500"
      >
        <p>{{ t('CategoryPage.noProducts') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'
import { productsApi } from '@/api'
import type { EcwidCategory, EcwidProduct } from '@/types/ecwid'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import { ROUTE_NAMES } from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const categoryStore = useCategoryStore()

const category = ref<EcwidCategory | null>(null)
const subcategories = ref<EcwidCategory[]>([])
const products = ref<EcwidProduct[]>([])
const breadcrumbs = ref<EcwidCategory[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const getCategoryLink = (cat: EcwidCategory) => {
  const parent = breadcrumbs.value.find(b => b.id === cat.parentId)
  return categoryStore.getCategoryUrl(cat, parent)
}

const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    const slug = route.params.slug as string
    const parentSlug = route.params.parentSlug as string | null
    category.value = await categoryStore.getCategoryByPath(parentSlug, slug)

    if (!category.value) {
      error.value = 'Category not found'
      return
    }

    const [breadcrumbData, subcategoriesData, productsResponse] = await Promise.all([
      categoryStore.getCategoryBreadcrumb(category.value.id),
      categoryStore.getSubcategories(category.value.id),
      productsApi.getAll(category.value.id)
    ])

    breadcrumbs.value = breadcrumbData
    subcategories.value = subcategoriesData
    products.value = productsResponse.items
    error.value = null
  } catch (err) {
    error.value = 'Failed to load category data.'
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

watch(
  () => [route.params.slug, route.params.parentSlug],
  () => loadData(),
  { immediate: true }
)
</script>
