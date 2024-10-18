'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProductAll } from '../lib/actions';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      //   const response = await fetch('/product/list_products/list_product.json');
      const response = await fetchProductAll();
      //   const data = await response.json();
      const data = response.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: '', //TODO fix image and category
          category: '',
        };
      });

      setProducts(data);
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
    <div className="container">
      {products.map((product) => (
        <div key={product.id} className="product">
          <div className="image-section">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="product-image"
              priority
            />
          </div>

          <div className="details-section">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>

            <div className="cart-section">
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
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
