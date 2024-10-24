import FeaturedProduct from '@/app/ui/landing/featured_product';
import { productRowCount } from '@/app/lib/data';

export default async function FeaturedProducts() {
  const productCount = await productRowCount();
  const randomProducts: number[] = Array.from(
    // Get an array of four randomized valid product ids
    {
      length: 4,
    },
    () => Math.floor(Math.random() * productCount)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      {randomProducts.map((productId) => {
        return <FeaturedProduct id={productId} key={productId} />;
      })}
    </div>
  );
}
