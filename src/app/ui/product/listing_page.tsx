'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/app/products/listing/product_list.module.css'
import { deleteProductById, fetchProductAll } from '@/app/lib/actions'
import Search from '@/app/ui/search'
import EditButton from '@/app/ui/product/components/edit_button'
import DeleteButton from '@/app/ui/product/components/delete_button'

type Product = {
  id: number
  name: string
  description: string
  price: number
  discountPercent?: number
  category: string
  sellerId: number
  image: { url: string }
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const router = useRouter()

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
        image: { url: product.image.url },
      }))

      setProducts(productData)
      setFilteredProducts(productData)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      await deleteProductById(productId)
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productId))
    }
  }

  const handleSearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product Listing</h1>
      <Search onSearch={handleSearch} />
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image.url}
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

              <div className={styles.buttonContainer} style={{ display: 'flex', gap: '10px', border: '1px solid red' }}>
                <EditButton onEdit={() => router.push(`/products/${product.id}/edit`)} />
                <DeleteButton onDelete={() => handleDelete(product.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
