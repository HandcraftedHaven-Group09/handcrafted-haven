import { Metadata } from 'next'
import { fetchProductAll } from '@/app/lib/actions'
import styles from './product_list.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Product Listing',
  description: 'Browse all products available in our store.',
}

export default async function ProductListingPage() {
  const products = await fetchProductAll()

  if (!products.length) {
    return <p>No products available.</p> 
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
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
                Discount: (${(product.price * (product.discountPercent / 100)).toFixed(2)})
              </p>
              <p className={styles.finalPrice}>
                Final Price: ${(product.price * (1 - product.discountPercent / 100)).toFixed(2)}
              </p>
            </>
          )}

          <p className={styles.seller}>Seller ID: {product.sellerId}</p>
        </div>
      ))}
    </div>
  )
}
