'user server';
import { getSellerWithCollectionsById } from '@/app/lib/data';
import SellerCollection from '@/app/ui/sellers/seller-collection';
import '@/app/ui/sellers/sellers.css';

export default async function SellerCollections({ id }: { id: number }) {
  console.log('!!!!----User id:', id);
  // const collections = await getSellerWithCollectionsById(id);
  const collections = {
    Collections: [
      { id: 1, name: 'bill', description: 'stuff', ownerId: 1, Products: [] },
    ],
  };

  return (
    <div className="seller-collections">
      <ul>
        {collections?.Collections.map((collection) => {
          return (
            <li key={collection.id}>
              <SellerCollection key={collection.id} collection={collection} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
