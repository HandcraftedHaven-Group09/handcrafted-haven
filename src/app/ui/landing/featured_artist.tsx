import { getSellersById } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function FeaturedArtist({ id }: { id: number }) {
  const seller = await getSellersById(id);
  return (
    <Link href={`/sellers/${id}`}>
      <h3>{seller?.firstName}</h3>  
      {/* <Image
        src={product?.image.url || ''}
        width={200}
        height={200}
        alt={product?.image.description || ''}
        unoptimized
      /> */}
      <p></p>
    </Link>
  );
}