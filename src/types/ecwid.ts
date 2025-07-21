export interface EcwidCategory {
  id: number
  parentId: number
  orderBy: number
  name: string
  url: string
  hdThumbnailUrl?: string
  thumbnailUrl?: string
  originalImageUrl?: string
  imageUrl?: string
  enabled: boolean
  productCount?: number
}

export interface ProductAttribute {
  id: number
  name: string
  type: string
  value: string
  show: string
}
export interface MediaImage {
  id: string
  isMain?: boolean
  orderBy?: number
  image160pxUrl?: string
  image400pxUrl?: string
  image800pxUrl?: string
  image1500pxUrl?: string
  imageOriginalUrl?: string
}

export interface ProductMedia {
  images?: MediaImage[]
  videos?: Record<string, unknown>[]
}

export interface ProductImage {
  id: string
  url: string
  thumbnail: string
  originalImageUrl: string
  imageUrl: string
  hdThumbnailUrl: string
  thumbnailUrl: string
  smallThumbnailUrl: string
  width?: number
  height?: number
  orderBy?: number
}

export interface ProductOptionChoice {
  text: string
  textTranslated?: Record<string, string>
  priceModifier?: number
  priceModifierType?: string
}

export interface ProductOption {
  type: string
  name: string
  nameTranslated?: Record<string, string>
  choices: ProductOptionChoice[]
  defaultChoice?: number
  required: boolean
}
export interface EcwidProduct {
  id: number
  sku: string
  name: string
  url: string
  price: number
  defaultDisplayedPrice: number
  defaultDisplayedPriceFormatted: string
  description?: string
  descriptionTruncated?: string
  enabled: boolean
  quantity?: number
  unlimited: boolean
  inStock: boolean
  hdThumbnailUrl?: string
  thumbnailUrl?: string
  imageUrl?: string
  originalImageUrl?: string
  smallThumbnailUrl?: string
  categories: number[]
  categoryIds: number[]
  defaultCategoryId?: number
  attributes?: ProductAttribute[]
  media?: ProductMedia
  galleryImages?: ProductImage[]
  options?: ProductOption[]
  tax?: { defaultLocationIncludedTaxRate: number }
  hasFreeShipping?: boolean
}

export interface CategoryResponse {
  total: number
  count: number
  offset: number
  limit: number
  items: EcwidCategory[]
}

export interface ProductResponse {
  total: number
  count: number
  offset: number
  limit: number
  items: EcwidProduct[]
}

export interface CartItem {
  product: EcwidProduct
  quantity: number
  selectedOptions?: Record<string, string>
}
