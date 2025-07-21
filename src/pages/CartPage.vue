<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      {{ t('CartPage.shoppingCart') }}
    </h1>

    <div v-if="cartItems.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-24 w-24 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <p class="text-xl text-gray-600 mb-4">
        {{ t('CartPage.cartEmpty') }}
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {{ t('CartPage.continueShopping') }}
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="divide-y divide-gray-200">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="py-6 flex items-start space-x-4"
            >
              <img
                v-if="item.product.thumbnailUrl"
                :src="item.product.thumbnailUrl"
                :alt="item.product.name"
                class="w-24 h-24 object-cover rounded-md"
              />
              <GradientPlaceholder
                v-else
                :seed="`product-${item.product.id}`"
                class="w-24 h-24 rounded-md"
              />

              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">
                  <router-link :to="`/product/${item.product.id}`" class="hover:text-blue-600">
                    {{ item.product.name }}
                  </router-link>
                </h3>
                <p class="mt-1 text-lg font-medium text-gray-900">
                  {{
                    item.product.defaultDisplayedPriceFormatted ||
                    `$${item.product.price.toFixed(2)}`
                  }}
                </p>

                <div
                  v-if="item.selectedOptions && Object.keys(item.selectedOptions).length > 0"
                  class="mt-2"
                >
                  <p class="text-sm text-gray-600">
                    <span v-for="(value, option, index) in item.selectedOptions" :key="option">
                      {{ option }}: {{ value
                      }}<span v-if="index < Object.keys(item.selectedOptions).length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div class="mt-4 flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <button
                      class="p-1 rounded-md hover:bg-gray-100"
                      :disabled="item.quantity <= 1"
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      :value="item.quantity"
                      type="number"
                      min="1"
                      class="w-16 text-center border border-gray-300 rounded-md py-1"
                      @change="
                        updateQuantity(
                          item.product.id,
                          Number(($event.target as HTMLInputElement).value)
                        )
                      "
                    />
                    <button
                      class="p-1 rounded-md hover:bg-gray-100"
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    class="text-red-600 hover:text-red-800"
                    @click="removeFromCart(item.product.id)"
                  >
                    {{ t('CartPage.remove') }}
                  </button>
                </div>
              </div>

              <div class="text-right">
                <p class="text-lg font-semibold text-gray-900">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ t('CartPage.orderSummary') }}
          </h2>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span class="text-gray-600"> {{ t('CartPage.subtotal') }}</span>
              <span class="font-medium">{{ totalPriceFormatted }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600"> {{ t('CartPage.shipping') }}</span>
              <span class="font-medium"> {{ t('CartPage.free') }}</span>
            </div>
          </div>

          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between">
              <span class="text-lg font-semibold">Total</span>
              <span class="text-lg font-semibold">{{ totalPriceFormatted }}</span>
            </div>
          </div>

          <button
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
            @click="handlePlaceOrder"
          >
            {{ t('CartPage.placeOrder') }}
          </button>

          <router-link to="/" class="block text-center mt-4 text-blue-600 hover:text-blue-800">
            {{ t('CartPage.continueShopping') }}
          </router-link>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessMessage"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showSuccessMessage = false"
    >
      <div class="bg-white rounded-lg p-8 max-w-md text-center" @click.stop>
        <svg
          class="mx-auto h-16 w-16 text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {{ t('CartPage.congratOnYourPurchase') }}
        </h2>
        <p class="text-gray-600 mb-6">
          {{ t('CartPage.succesPlaced') }}
        </p>
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          @click="closeSuccessMessage"
        >
          {{ t('common.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import GradientPlaceholder from '@/components/GradientPlaceholder.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const { cartItems, removeFromCart, updateQuantity, clearCart, totalPriceFormatted } = useCart()

const showSuccessMessage = ref(false)

const handlePlaceOrder = () => {
  showSuccessMessage.value = true
}

const closeSuccessMessage = () => {
  showSuccessMessage.value = false
  clearCart()
  router.push('/')
}
</script>
