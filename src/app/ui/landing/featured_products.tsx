import { getProductsAll, getProductWithImageById } from '@/app/lib/data';
import { useState, useEffect } from 'react';

 interface FeaturedIdProps {
    onGetProducts: (products: any[]) => void;
 }
// Get products from table and return just the id's.
const getProductIds = async (): Promise<number[]> => {
    const products = await getProductsAll();
    const featured = products.map(featuredId => featuredId.id);
    return featured;
    }

const getRandomIds = (ids: number[], count: number): number[] => {
    const shuffle = [...ids].sort(() => 0.5 - Math.random());
    return shuffle.slice(0, count);
}

//  Using the id's, create an array of 4 random id's to pass back to landing page.
const FeaturedIds: React.FC<FeaturedIdProps> = ({ onGetProducts }) => {

    useEffect(() => {
        const selectFeaturedIds = async () => {
            const ids = await getProductIds();
            const randomIds = getRandomIds(ids, 4);
            const products = await Promise.all(randomIds.map(id => getProductWithImageById(id)));
            onGetProducts(products);
        };

        selectFeaturedIds();
    }, [onGetProducts]);

    return null;
}

export default FeaturedIds;