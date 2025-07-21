<template>
  <router-link
    :to="categoryUrl"
    class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
      <div
        class="h-40 w-full object-cover object-center hover:scale-105 transition-transform duration-300"
      >
        <GradientPlaceholder :seed="`category-${category.id}`" class="h-40 w-full" />
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
        {{ category.name }}
      </h3>
      <p v-if="category.productCount !== undefined" class="mt-1 text-sm text-gray-500">
        {{ category.productCount }}
        {{ category.productCount === 1 ? 'product' : 'products' }}
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import type { EcwidCategory } from '@/types/ecwid'
import GradientPlaceholder from '@/components/GradientPlaceholder.vue'

const props = defineProps<{
  category: EcwidCategory
  parentCategory?: EcwidCategory | null
}>()

const store = useCategoryStore()
const categoryUrl = computed(() => store.getCategoryUrl(props.category, props.parentCategory))
</script>
