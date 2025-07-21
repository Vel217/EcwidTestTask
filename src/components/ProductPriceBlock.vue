<template>
  <div class="mb-6">
    <p class="text-3xl font-bold text-gray-900 mb-2">
      {{ product.defaultDisplayedPriceFormatted || `$${product.price.toFixed(2)}` }}
    </p>

    <p v-if="product.tax" class="text-xl font-bold text-gray-300">
      {{ t('ProductPage.taxInclude') }}: ({{ product.tax.defaultLocationIncludedTaxRate }}%)
      {{ `${product.defaultDisplayedPriceFormatted?.[0] || '$'} ${includedTax}` }}
    </p>

    <p
      v-if="product.hasFreeShipping"
      class="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-1 text-l font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-4"
    >
      {{ t('ProductPage.freeShipping') }}
    </p>

    <p v-if="!product.inStock" class="mt-2 text-red-600 font-semibold">
      {{ t('ProductPage.outOfStock') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EcwidProduct } from '@/types/ecwid'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  product: EcwidProduct
}>()

const includedTax = computed(() => {
  if (!props.product.tax) return '0.00'
  const price = props.product.defaultDisplayedPrice || props.product.price
  return ((price * props.product.tax.defaultLocationIncludedTaxRate) / 100).toFixed(2)
})
</script>
