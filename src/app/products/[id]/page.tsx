import IndividualProduct from '@/app/ui/product/individual_product'
import { fetchProductById } from '@/app/lib/actions'
import { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

// Generating metadata dynamically based on the product name
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  try {
    const product = await fetchProductById(id)
    return {
      title: product?.name || 'Product Details',
      description: `View the details of ${product?.name || 'this product'}.`,
    }
  } catch (error) {
    console.error('Failed to fetch product metadata:', error)
    return {
      title: 'Product Details',
      description: 'View the details of this product.',
    }
  }
}

export default function ProductDetailsWrapperPage({ params }: Props) {
  return <IndividualProduct id={params.id} />
}
