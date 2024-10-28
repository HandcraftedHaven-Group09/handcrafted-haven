import ProductDetailsWrapper from '@/app/ui/product/edit_product'
import { fetchProductById } from '@/app/lib/actions'
import { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

// Gerando metadata dinamicamente baseado no nome do produto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  try {
    const product = await fetchProductById(id)
    return {
      title: product?.name || 'Product Details',
      description: `Edit the details of ${product?.name || 'this product'}.`,
    }
  } catch (error) {
    console.error('Failed to fetch product metadata:', error)
    return {
      title: 'Product Details',
      description: 'Edit the details of this product.',
    }
  }
}

export default function ProductDetailsWrapperPage({ params }: Props) {
  return <ProductDetailsWrapper params={{ id: params.id }} />
}
