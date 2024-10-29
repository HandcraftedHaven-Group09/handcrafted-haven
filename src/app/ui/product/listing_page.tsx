'use client'
import { useState, useEffect } from 'react'
import { fetchProductAll, authenticateSeller } from '@/app/lib/actions'
import styles from '@/app/products/listing/product_list.module.css'

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

export default function ListingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [authorized, setAuthorized] = useState(false)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const formData = new FormData()
        formData.append('email', 'seller@example.com')
        formData.append('password', 'password123')

        const authResult = await authenticateSeller(undefined, formData)

        if (typeof authResult === 'string') {
          console.error(authResult)
          setUnauthorized(true) // As not authorized
        } else {
          setAuthorized(true) // As authorized
          fetchProducts()
        }
      } catch (error) {
        console.error('Access denied:', error)
        setUnauthorized(true) // As not authorized in case of error
      }
    }

    checkAuthorization()
  }, [])

  const fetchProducts = async () => {
    const response = await fetchProductAll()
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
  }

  if (unauthorized) {
    return <p className={styles.unauthorized}> Unauthorized Access..</p>
  }

  return (
    <div className={styles.container}>
      <h1>Listing Page - Seller Only Access</h1>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
          <p className={styles.seller}>Seller ID: {product.sellerId}</p>
        </div>
      ))}
    </div>
  )
}
