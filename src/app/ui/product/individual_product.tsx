'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchProductById } from '@/app/lib/actions';
import styles from '@/app/products/[id]/product_details.module.css';
import BackButton from '@/app/ui/product/components/back_button';
import RatingsBox from './rating/ratings-box';
import { useSession } from 'next-auth/react';

type Review = {
  id: number;
  rating: number;
  review: string | null;
  user: { displayName: string };
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  discountPercent?: number;
  sellerId?: number;
  averageRating: string; // Average of aggregate rating
  image: { url: string };
  Reviews: Review[];
  seller: { displayName: string };
};

type Props = {
  id: string;
};

export default function IndividualProduct({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null);

  const session = useSession();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {product.image?.url && (
        <div style={{ textAlign: 'center' }}>
          <Image
            src={product.image.url}
            alt={product.name}
            width={500}
            height={500}
            className={styles.productImage}
            unoptimized
          />
        </div>
      )}
      <div className={styles.productDetails}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        {product.discountPercent && (
          <p>Discount: {product.discountPercent}% off</p>
        )}
        <p>Category: {product.category}</p>
        <p>Seller: {product.seller.displayName}</p>

        {/* Displays the average rating */}
        <p>Average Rating: {product.averageRating} / 5</p>

        {/* Comment section */}
        <RatingsBox
          productId={product.id}
          // productId={1}
          userId={session.data?.user.id || 1}
          // userId={1}
        />
        <div className={styles.commentsSection}>
          <h2>Comments</h2>
          {product.Reviews.length > 0 ? (
            product.Reviews.map((review) => (
              <div key={review.id} className={styles.comment}>
                <p>
                  <strong>{review.user.displayName}</strong> ({review.rating} /
                  5)
                </p>
                <p>{review.review || 'No comment provided.'}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <BackButton backTo="/products" className={styles.backButton} />
      </div>
    </div>
  );
}
