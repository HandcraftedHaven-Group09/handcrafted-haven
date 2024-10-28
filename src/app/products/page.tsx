import { Metadata } from 'next'
import ProductPage from '@/app/ui/product/products_page'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our collection of handcrafted products',
}

export default function ProductsPageWrapper() {
  return <ProductPage />
}
