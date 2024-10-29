import { Metadata } from 'next'
import ProductListing from '@/app/ui/product/listing_page'

export const metadata: Metadata = {
  title: 'Product Listing',
  description: 'Browse all products available in our store.',
}

export default function ProductListingPage() {
  return <ProductListing />
}
