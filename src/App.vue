<script setup lang="ts">
import CartIcon from '@/components/CartIcon.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Ecwid Store
          </router-link>

          <nav class="flex items-center space-x-6">
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>

    <main class="min-h-[calc(100vh-73px)]">
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2025 Ecwid Store.</p>
      </div>
    </footer>
  </div>
</template>
