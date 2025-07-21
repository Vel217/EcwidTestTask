<template>
  <div class="space-y-4">
    <div class="relative bg-white rounded-lg overflow-hidden">
      <img
        v-if="currentImage"
        :src="currentImage.originalImageUrl || currentImage.imageUrl"
        :alt="productName"
        class="w-full h-auto object-cover"
      />
      <GradientPlaceholder v-else :seed="`product-${productId}`" class="w-full h-96" />

      <button
        v-if="resolvedImages.length > 1 && currentIndex > 0"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
        aria-label="Previous image"
        @click="previousImage"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        v-if="resolvedImages.length > 1 && currentIndex < resolvedImages.length - 1"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
        aria-label="Next image"
        @click="nextImage"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div v-if="resolvedImages.length > 1" class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="(image, index) in resolvedImages"
        :key="image.id"
        class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors"
        :class="
          currentIndex === index ? 'border-blue-600' : 'border-gray-300 hover:border-gray-400'
        "
        @click="currentIndex = index"
      >
        <img
          :src="image.thumbnailUrl || image.imageUrl"
          :alt="`${productName} thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import GradientPlaceholder from '@/components/GradientPlaceholder.vue'
import type { ProductImage } from '@/types/ecwid'

const props = defineProps<{
  images: ProductImage[]
  productName: string
  productId: number
  singleImageUrl?: string
  singleOriginalImageUrl?: string
}>()

const currentIndex = ref(0)

const allImages = computed(() => {
  if (props.images.length > 0) {
    return props.images
  }

  if (props.singleImageUrl || props.singleOriginalImageUrl) {
    return [
      {
        id: 'single',
        url: props.singleImageUrl || props.singleOriginalImageUrl || '',
        imageUrl: props.singleImageUrl || '',
        originalImageUrl: props.singleOriginalImageUrl || '',
        thumbnail: props.singleImageUrl || '',
        thumbnailUrl: props.singleImageUrl || '',
        hdThumbnailUrl: '',
        smallThumbnailUrl: ''
      }
    ]
  }

  return []
})

const resolvedImages = computed(() => allImages.value)

const currentImage = computed(() => resolvedImages.value[currentIndex.value])

const nextImage = () => {
  if (currentIndex.value < resolvedImages.value.length - 1) {
    currentIndex.value++
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>
