import { Metadata } from 'next'
import ProductDetailsPage from './page'
import { fetchProductById } from '@/app/lib/actions'

type Props = {
  params: {
    id: string
  }
}

// Dynamically generate metadata based on the product's name
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  const product = await fetchProductById(id)
  return {
    title: product?.name || 'Product Details',
  }
}

export default function ProductDetailsWrapper({ params }: Props) {
  // Server-side passing the id to the client component
  return <ProductDetailsPage params={{ id: params.id }} />
}
