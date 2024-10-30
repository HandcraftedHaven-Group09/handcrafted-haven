'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fetchProductAll, deleteProductById } from '@/app/lib/actions'
import ProductSearch from '@/app/ui/search'
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
  sellerName?: string  
  image: {
    url: string
  }
}

export default function ListingPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

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
        discountAbsolute: product.discountAbsolute,
        sellerName: product.seller?.displayName,
        image: { url: product.image.url },
      }))

      setProducts(productData)
      setFilteredProducts(productData)
    }

    fetchProducts()
  }, [])

  const handleSearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    )
    setFilteredProducts(filtered)
  }

  const handleEditProduct = (productId: number) => {
    router.push(`/products/${productId}/edit`)
  }

  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      await deleteProductById(productId)
      setProducts(products.filter((product) => product.id !== productId))
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productId))
    }
  }

  const handleCreateProduct = () => {
    router.push('/products/create')
  }

  return (
    <div className={styles.container}>
      <h1>Product Listing Page</h1>
      <button
        onClick={handleCreateProduct}
        className={styles.addProductButton}
      >
        Add New Product
      </button>

      {/* Componente de busca */}
      <ProductSearch onSearch={handleSearch} />

      {filteredProducts.map((product) => (
        <div key={product.id} className={styles.product}>
          <h1 className={styles.title}>{product.name}</h1>
          <Image
            src={product.image.url}
            alt={product.name}
            width={200}
            height={200}
            className={styles.productImage}
            unoptimized
          />
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
          <p className={styles.discountPercent}>Discount: {product.discountPercent}%</p>
          <p className={styles.seller}>Seller: {product.sellerName || 'Unknown Seller'}</p>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleEditProduct(product.id)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
