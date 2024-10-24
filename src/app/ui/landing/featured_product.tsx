import { getProductWithImageById } from '@/app/lib/data';
import Image from 'next/image';

export default async function FeaturedProduct({ id }: { id: number }) {
  const product = await getProductWithImageById(id);
  return (
    <div>
      <h3>{product?.name}</h3>
      <Image
        src={product?.image.url || ''}
        alt={product?.image.description || ' '}
        width={200}
        height={200}
        unoptimized
      />
    </div>
  );
}
