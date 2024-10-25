import { getProductWithImageById } from "@/app/lib/data";
import Image from 'next/image';
import Link from 'next/link';

export default async function FeaturedProduct({ id }: {id: number }) {
    const product = await getProductWithImageById(id);
    return (
        <Link href={`/products/${id}`}>
            <Image
                src={product?.image.url || ''}
                width={200}
                height={200}
                alt={product?.image.description || ''}
                unoptimized
            />
            <h3>{product?.name}</h3>
        </Link>
    );
}