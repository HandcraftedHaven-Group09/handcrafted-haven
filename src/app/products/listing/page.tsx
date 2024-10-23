'use client'  

import { useRouter } from 'next/navigation'; 
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './product_list.module.css'
import { fetchProductAll, deleteProductById } from '@/app/lib/actions'

type Product = {
  id: number
  name: string
  description: string
  price: number
  discountPercent?: number
  category: string
  sellerId: number
  image: string
}

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchProductAll()
      const productData = response.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        discountPercent: product.discountPercent,
        sellerId: product.sellerId,
        image: product.image.url, 
      }))
      setProducts(productData)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      await deleteProductById(productId); // Call delete function
      setProducts(products.filter((product) => product.id !== productId)); // Update the product list
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product Listing</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className={styles.productImage}
                unoptimized
              />
            </div>
            <div className={styles.productDetails}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              {product.discountPercent && (
                <p><strong>Discount:</strong> {product.discountPercent}% off</p>
              )}
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Seller ID:</strong> {product.sellerId}</p>

              <div className={styles.buttonContainer}>
                <button 
                  onClick={() => router.push(`/products/${product.id}/edit`)} 
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
