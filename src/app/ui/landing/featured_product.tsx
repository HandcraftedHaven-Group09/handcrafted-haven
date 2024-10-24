import { getProductWithImageById } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function FeaturedProduct({ id }: { id: number }) {
  const product = await getProductWithImageById(id);
  return (
    <Link
      href={`/products/${id}`}
      style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '200px' }}
    >
      <h3
        style={{
          gridColumn: '1/2',
          gridRow: '1/2',
          zIndex: '4',
          padding: '.5rem',
          textShadow: '0 0 10px black',
          margin: '0',
        }}
      >
        {product?.name}
      </h3>
      <Image
        style={{ gridColumn: '1/2', gridRow: '1/2', zIndex: '2' }}
        src={product?.image.url || ''}
        alt={product?.image.description || ' '}
        width={200}
        height={200}
        unoptimized
      />
    </Link>
  );
}
