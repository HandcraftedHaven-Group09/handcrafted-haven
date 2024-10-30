import Link from 'next/link';
import './sellers.css';
import {
  Prisma,
  SellerCollection as SellerCollectionType,
} from '@prisma/client';

type CollectionWithProducts = Prisma.SellerCollectionGetPayload<{
  include: { Products?: true };
}>;

export default async function SellerCollection({
  collection,
}: {
  collection: CollectionWithProducts;
}) {
  return (
    <div className="seller-collection">
      <h4>{collection.name}</h4>
      <p>{collection.description}</p>
      {collection.Products ? (
        <ul>
          {collection.Products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        'EMPTY'
      )}
    </div>
  );
}
