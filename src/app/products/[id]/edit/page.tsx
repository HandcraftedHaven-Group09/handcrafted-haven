import EditProductPage from '@/app/ui/product/edit_product';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Product',
  description: 'Modify the details of your product.',
}

export default async function ProductEdit({ params }: { params: { id: string } }) {
  return <EditProductPage params={params} />;
}
