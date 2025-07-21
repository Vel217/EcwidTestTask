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
      <section v-if="categories.length > 0" class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          {{ t('common.categories') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
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
        v-if="categories.length === 0 && products.length === 0"
        class="text-center py-12 text-gray-500"
      >
        <p>{{ t('common.noProductsOrCategories') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import type { EcwidCategory } from '@/types/ecwid'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const loading = ref(true)
const error = ref<string | null>(null)
const categories = ref<EcwidCategory[]>([])
const products = computed(() => productStore.products)

const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    const topCategories = await categoryStore.getTopLevelCategories()
    await productStore.fetchAllProducts()
    categories.value = topCategories

    categories.value = topCategories
    error.value = null
  } catch (err) {
    error.value = 'Failed to load data. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
