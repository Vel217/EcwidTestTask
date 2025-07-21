<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-8">
      <p>{{ error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="loadProduct"
      >
        {{ t('common.tryAgain') }}
      </button>
    </div>

    <div v-else-if="product" class="max-w-6xl mx-auto">
      <ProductBreadcrumbs :product="product" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageGallery
          :images="productImages"
          :product-name="product.name"
          :product-id="product.id"
          :single-image-url="product.imageUrl"
          :single-original-image-url="product.originalImageUrl"
        />

        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ product.name }}
          </h1>

          <ProductPriceBlock :product="product" />

          <div v-if="product.description" class="mb-8 prose prose-gray max-w-none">
            <h2 class="text-xl font-semibold mb-4">
              {{ t('ProductPage.description') }}
            </h2>
            <div v-html="product.description" />
          </div>

          <ProductOptionsBlock v-model="selectedOptions" :product="product" />

          <div class="flex flex-col gap-2 mb-8">
            <label for="quantity" class="text-gray-700"> {{ t('ProductPage.quantity') }}:</label>
            <input
              id="quantity"
              v-model.number="quantity"
              type="number"
              min="1"
              class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="!product.inStock"
            />
          </div>

          <button
            class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="!product.inStock || !isValidSelection"
            @click="handleAddToCart"
          >
            {{ product.inStock ? t('ProductPage.addToCart') : t('ProductPage.outOfStock') }}
          </button>

          <div v-if="product.attributes && product.attributes.length > 0" class="mt-8">
            <h2 class="text-xl font-semibold mb-4">
              {{ t('ProductPage.specifications') }}
            </h2>
            <dl class="divide-y divide-gray-200">
              <div
                v-for="attr in product.attributes"
                :key="attr.id"
                class="py-3 flex justify-between"
              >
                <dt class="text-gray-600">
                  {{ attr.name }}
                </dt>
                <dd class="text-gray-900 font-medium">
                  {{ attr.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section v-if="recommendedProducts.length > 0" class="mt-16">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">
          {{ t('ProductPage.recommendedProd') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="recommendedProduct in recommendedProducts"
            :key="recommendedProduct.id"
            :product="recommendedProduct"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCart } from '@/composables/useCart'
import type { EcwidProduct } from '@/types/ecwid'
import ProductImageGallery from '@/components/ProductImageGallery.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductBreadcrumbs from '@/components/ProductBreadcrumbs.vue'
import ProductPriceBlock from '@/components/ProductPriceBlock.vue'
import ProductOptionsBlock from '@/components/ProductOptionsBlock.vue'
import { resolveProductImages } from '@/utils/ProductImageResolver'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { addToCart } = useCart()

const product = ref<EcwidProduct | null>(null)
const recommendedProducts = ref<EcwidProduct[]>([])
const quantity = ref(1)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedOptions = ref<Record<string, string>>({})

const isValidSelection = computed(() => {
  if (!product.value?.options) return true
  return product.value.options.every(
    option => !option.required || selectedOptions.value[option.name]
  )
})

const productImages = computed(() => resolveProductImages(product.value))

const handleAddToCart = () => {
  if (product.value && product.value.inStock && isValidSelection.value) {
    addToCart(product.value, quantity.value, selectedOptions.value)
    router.push('/cart')
  }
}

const loadProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const productId = Number(route.params.id)
    product.value = await productStore.getProductById(productId)

    selectedOptions.value = {}
    product.value.options?.forEach(opt => {
      if (opt.defaultChoice !== undefined) {
        selectedOptions.value[opt.name] = opt.choices[opt.defaultChoice].text
      }
    })

    recommendedProducts.value = await productStore.getRecommended(product.value, 4)
    error.value = null
  } catch (err) {
    error.value = 'Failed to load product.'
    console.error('Error fetching product:', err)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  () => {
    quantity.value = 1
    selectedOptions.value = {}
    loadProduct()
  },
  { immediate: true }
)
</script>
