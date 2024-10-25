'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchProductById } from '@/app/lib/actions'
import styles from './product_details.module.css'
import AddToCartButton from '@/app/ui/product/components/add__cart_button'
import QuantityInput from '@/app/ui/product/components/quantity'

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  discountPercent?: number
  sellerId?: number
  image: {
    url: string
  }
}

type Props = {
  params: {
    id: string
  }
}

export default function ProductDetailsPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await fetchProductById(params.id)
          setProduct(fetchedProduct)
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }

      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      console.log(`${quantity} of ${product.name} added to the cart`)
    }
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      {product.image?.url && (
        <Image
          src={product.image.url}
          alt={product.name}
          width={500}
          height={500}
          className={styles.productImage}
          unoptimized
        />
      )}
      <div className={styles.productDetails}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        {product.discountPercent && (
          <p>Discount: {product.discountPercent}% off</p>
        )}
        <p>Category: {product.category}</p>
        <p>Seller ID: {product.sellerId}</p>

        <div className={styles.cartSection}>
          <QuantityInput value={quantity} onChange={setQuantity} />
          <AddToCartButton onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  )
}
