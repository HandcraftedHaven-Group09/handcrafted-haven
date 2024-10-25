import { getProductsAll } from '@/app/lib/data';
import FeaturedProduct from './featured_product';
import '@/app/ui/landing/landing.css';

// Get products from table and return just the id's.
// const getProductIds = async () => {
//     const products = await getProductsAll();
//     const featured = products.map(featuredId => featuredId.id);
//     return featured;
//     }

const getRandomIds = (ids: number[], count: number): number[] => {
  const shuffle = [...ids].sort(() => 0.5 - Math.random());
  return shuffle.slice(0, count);
};

// //  Using the id's, create an array of 4 random products.
// const FeaturedIds = () => {

//     useEffect(() => {
//         const selectFeaturedIds = async () => {
//             const ids = await getProductIds();
//             const randomIds = getRandomIds(ids, 4);
//             const products = await Promise.all(randomIds.map(id => getProductWithImageById(id)));
//         };

//         selectFeaturedIds();
//     }, []);

//     return null;
// }

// export default FeaturedIds;

export default async function FeaturedProducts() {
  const products = await getProductsAll();
  const ids: number[] = products.map((product) => product.id);
  const randomIds: number[] = getRandomIds(ids, 4);

  return (
    <>
      <h2>Featured Products</h2>
      <div id="featured-products">
        {randomIds.map((productId) => {
          return <FeaturedProduct id={productId} key={productId} />;
        })}
      </div>
    </>
  );
}
