'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProductAll } from '../lib/actions';
import styles from './product_page.module.css';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  discountPercent?: number;
  discountAbsolute?: number;
  sellerId?: number;
  image: string;
  // image: {
  //   url: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchProductAll(); // Get all products from the db

      const productData = response.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          // category: 'FIX LATER',
          discountPercent: product.discountPercent,
          discountAbsolute: product.discountAbsolute,
          sellerId: product.sellerId,
          image: product.image.url,
          // image: '/default.jpg',
        };
      });

      setProducts(productData);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log(
      `${quantities[product.id] || 1} of ${product.name} added to the cart`
    );
  };

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          {/* {product.image?.map((img, index) => ( */}
          <Image
            // key={index}
            key={product.id}
            // src={img.url}
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className={styles.productImage}
            unoptimized
          />
          {/* ))} */}

          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.description}>{product.description}</p>

          <p className={styles.price}>
            Original Price: ${product.price.toFixed(2)}
          </p>
          {product.discountPercent && product.discountPercent > 0 && (
            <>
              <p className={styles.discount}>
                Discount: ($
                {(product.price * (product.discountPercent / 100)).toFixed(2)})
              </p>
              <p className={styles.finalPrice}>
                Final Price: $
                {(product.price * (1 - product.discountPercent / 100)).toFixed(
                  2
                )}
              </p>
            </>
          )}

          <p className={styles.seller}>Seller ID: {product.sellerId}</p>

          <div className={styles.cartSection}>
            <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
            <input
              type="number"
              id={`quantity-${product.id}`}
              name="quantity"
              value={quantities[product.id] || 1}
              onChange={(e) =>
                handleQuantityChange(product.id, Number(e.target.value))
              }
              min="1"
            />
            <button
              onClick={() => handleAddToCart(product)}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
