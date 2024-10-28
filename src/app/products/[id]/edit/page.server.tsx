import { fetchProductById, fetchCategories } from '@/app/lib/actions';
import EditProductPage from './page';

export default async function ProductEdit({ params }: { params: { id: string } }) {
  return <EditProductPage params={params} />;
}
