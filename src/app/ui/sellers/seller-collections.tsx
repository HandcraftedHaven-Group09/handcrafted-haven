import { getSellerWithCollectionsById } from '@/app/lib/data';
import SellerCollection from '@/app/ui/sellers/seller-collection';
import './users.css';

export default async function UserLists({ id }: { id: number }) {
  const collections = await getSellerWithCollectionsById(id);

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
