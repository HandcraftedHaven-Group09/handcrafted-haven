import { getProductsAll } from '@/app/lib/data';
import FeaturedProduct from './featured_product';

const getRandomIds = (ids: number[], count: number): number[] => {
    const shuffle = [...ids].sort(() => 0.5 - Math.random());
    return shuffle.slice(0, count);
}
export default async function FeaturedProducts() {
    const products = await getProductsAll();
    const ids: number[] = products.map(product => product.id);
    const randomIds: number[] = getRandomIds(ids, 4);

    return (
        <div id="featured-products">
            <h2>Featured Products</h2>
            <div className="featured-products-grid">
            {randomIds.map((productId) => {
                return <FeaturedProduct id={productId} key={productId} />;
            })}
        </div>
        </div>
    );
}