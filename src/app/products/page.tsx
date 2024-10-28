'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchProductAll } from '../lib/actions'
import styles from './product_page.module.css'
import ProductSearch from '@/app/ui/search'

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  discountPercent?: number
  discountAbsolute?: number
  sellerId?: number
  image: {
    url: string
  }
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchProductAll() // Get all products from the db
      const productData = response.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        discountPercent: product.discountPercent,
        discountAbsolute: product.discountAbsolute,
        sellerId: product.sellerId,
        image: { url: product.image.url },
      }))

      setProducts(productData)
      setFilteredProducts(productData)
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log(`${quantities[product.id] || 1} of ${product.name} added to the cart`)
  }

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }))
  }

  const handleSearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProducts(filtered)
  }

  return (
    <div className={styles.container}>
      <ProductSearch onSearch={handleSearch} />
      {filteredProducts.map((product) => (
        <div key={product.id} className={styles.product}>
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image.url}
              alt={product.name}
              width={400}
              height={400}
              className={styles.productImage}
              unoptimized
            />
          </Link>

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
                {(product.price * (1 - product.discountPercent / 100)).toFixed(2)}
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
              onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
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
  )
}
