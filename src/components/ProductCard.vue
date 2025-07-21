<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <router-link :to="{ name: ROUTE_NAMES.PRODUCT, params: { id: product.id } }" class="block">
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.name"
          class="h-65 w-full object-cover object-center hover:scale-110 transition-transform duration-300"
        />
        <GradientPlaceholder v-else :seed="`product-${product.id}`" class="h-48 w-full" />
      </div>
    </router-link>

    <div class="p-4 flex flex-col">
      <div class="flex flex-col justify-stretch">
        <router-link :to="{ name: ROUTE_NAMES.PRODUCT, params: { id: product.id } }">
          <h3
            class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors md:min-h-[84px] xl:min-h-[56px]"
          >
            {{ product.name }}
          </h3>
        </router-link>

        <p class="mt-2 text-xl font-bold text-gray-900">
          {{ product.defaultDisplayedPriceFormatted || `$${product.price.toFixed(2)}` }}
        </p>
      </div>

      <button
        class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!product.inStock"
        @click="handleAddToCart"
      >
        {{ product.inStock ? t('ProductPage.addToCart') : t('ProductPage.outOfStock') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart'
import { ROUTE_NAMES } from '@/router'
import type { EcwidProduct } from '@/types/ecwid'
import GradientPlaceholder from '@/components/GradientPlaceholder.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  product: EcwidProduct
}>()

const { addToCart } = useCart()

const handleAddToCart = () => {
  if (props.product.inStock) {
    addToCart(props.product)
  }
}
</script>
