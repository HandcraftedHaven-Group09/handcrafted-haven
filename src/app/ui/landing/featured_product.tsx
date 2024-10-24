import { getProductWithImageById } from "@/app/lib/data";
import Image from 'next/image';
import Link from 'next/link';

export default async function FeaturedProduct({ id }: {id: number }) {
    const product = await getProductWithImageById(id);
    return (
        <Image
            src={product?.image.url || ''}
            width={100}
            height={100}
            alt={product?.image.description || ''}
            unoptimized
        />
    );
}