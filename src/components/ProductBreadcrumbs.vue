<template>
  <nav class="mb-6 flex items-center space-x-2 text-sm text-gray-600">
    <router-link :to="{ name: ROUTE_NAMES.HOME }" class="hover:text-blue-600">
      {{ t('common.home') }}
    </router-link>
    <span>/</span>
    <span class="text-gray-900">{{ product.name }}</span>
  </nav>
</template>

<script setup lang="ts">
import type { EcwidProduct } from '@/types/ecwid'
import { ROUTE_NAMES } from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  product: EcwidProduct
}>()
</script>
