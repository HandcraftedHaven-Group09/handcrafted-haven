import NewProductForm from '@/app/ui/product/new_product'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create New Product',
  description: 'Add a new product to your store. Fill out the form below to create a new product.',
}

export default function NewProductPage() {
  return (
    <div>
      <NewProductForm />
    </div>
  )
}
