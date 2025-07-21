<template>
  <div>
    <div class="text-sm font-medium text-gray-500 my-2">
      {{ t('ProductPage.sku') }}: {{ product.sku }}
    </div>

    <div v-if="product.options && product.options.length > 0" class="mb-6 space-y-6">
      <fieldset
        v-for="option in product.options"
        :key="option.name"
        class="space-y-2"
        :aria-label="`Choose a ${option.name}`"
      >
        <legend class="block text-sm font-medium text-gray-700">
          {{ option.name }}
          <span v-if="option.required" class="text-red-500">*</span>
        </legend>

        <div class="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <label
            v-for="choice in option.choices"
            :key="choice.text"
            class="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-600"
          >
            <input
              v-model="localSelected[option.name]"
              type="radio"
              :name="option.name"
              :value="choice.text"
              :required="option.required"
              class="absolute inset-0 appearance-none focus:outline-none"
            />
            <span class="text-sm font-medium text-center group-has-[:checked]:text-white">
              {{ choice.text }}
              <span v-if="choice.priceModifier && choice.priceModifier > 0">
                (+${{ choice.priceModifier.toFixed(2) }})
              </span>
            </span>
          </label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { EcwidProduct } from '@/types/ecwid'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  product: EcwidProduct
  modelValue: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void
}>()

const localSelected = ref({ ...props.modelValue })

watch(
  localSelected,
  newVal => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)
</script>
