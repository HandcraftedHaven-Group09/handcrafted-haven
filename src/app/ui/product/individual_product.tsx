'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchProductById } from '@/app/lib/actions'
import styles from '@/app/products/[id]/product_details.module.css'
import BackButton from '@/app/ui/product/components/back_button'

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
  id: string
}

export default function IndividualProduct({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id)
        setProduct(fetchedProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <BackButton backTo="/products" /> {/* Botão para retornar à lista de produtos */}
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
      </div>
    </div>
  )
}
