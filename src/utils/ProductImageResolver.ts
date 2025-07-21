import type { EcwidProduct, ProductImage } from '@/types/ecwid'

export function resolveProductImages(product: EcwidProduct | null): ProductImage[] {
  if (!product) return []

  if (product.galleryImages && product.galleryImages.length > 0) {
    const mainImage: ProductImage = {
      id: '0',
      url: product.imageUrl || product.originalImageUrl || '',
      imageUrl: product.imageUrl || '',
      originalImageUrl: product.originalImageUrl || '',
      thumbnail: product.thumbnailUrl || product.smallThumbnailUrl || '',
      thumbnailUrl: product.thumbnailUrl || '',
      hdThumbnailUrl: product.hdThumbnailUrl || '',
      smallThumbnailUrl: product.smallThumbnailUrl || ''
    }
    return [mainImage, ...product.galleryImages]
  }

  if (product.media?.images && product.media.images.length > 0) {
    return product.media.images.map(img => ({
      id: img.id,
      url: img.imageOriginalUrl || img.image1500pxUrl || img.image800pxUrl || '',
      imageUrl: img.image800pxUrl || img.image400pxUrl || '',
      originalImageUrl: img.imageOriginalUrl || '',
      thumbnail: img.image160pxUrl || '',
      thumbnailUrl: img.image400pxUrl || img.image160pxUrl || '',
      hdThumbnailUrl: img.image800pxUrl || '',
      smallThumbnailUrl: img.image160pxUrl || ''
    }))
  }

  return []
}
