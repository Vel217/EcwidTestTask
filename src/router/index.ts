import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const ROUTE_PATHS = {
  HOME: '/',
  CATEGORY: '/category/:slug',
  SUBCATEGORY: '/category/:parentSlug/:slug',
  PRODUCT: '/product/:id',
  CART: '/cart'
} as const

export const ROUTE_NAMES = {
  HOME: 'Home',
  CATEGORY: 'Category',
  SUBCATEGORY: 'Subcategory',
  PRODUCT: 'Product',
  CART: 'Cart'
} as const

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATHS.HOME,
    name: ROUTE_NAMES.HOME,
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: ROUTE_PATHS.CATEGORY,
    name: ROUTE_NAMES.CATEGORY,
    component: () => import('../pages/CategoryPage.vue')
  },
  {
    path: ROUTE_PATHS.SUBCATEGORY,
    name: ROUTE_NAMES.SUBCATEGORY,
    component: () => import('../pages/CategoryPage.vue')
  },
  {
    path: ROUTE_PATHS.PRODUCT,
    name: ROUTE_NAMES.PRODUCT,
    component: () => import('../pages/ProductPage.vue')
  },
  {
    path: ROUTE_PATHS.CART,
    name: ROUTE_NAMES.CART,
    component: () => import('../pages/CartPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
