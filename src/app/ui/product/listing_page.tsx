'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fetchProductAll, authenticateSeller, deleteProductById } from '@/app/lib/actions'
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
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [authorized, setAuthorized] = useState(false)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const formData = new FormData()
        formData.append('email', 'sadf@sadg.com')
        formData.append('password', '123456')

        const authResult = await authenticateSeller(undefined, formData)

        if (typeof authResult === 'string') {
          console.error(authResult)
          setUnauthorized(true)
        } else {
          setAuthorized(true)
          fetchProducts()
        }
      } catch (error) {
        console.error('Access denied:', error)
        setUnauthorized(true)
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

  const handleEditProduct = (productId: number) => {
    router.push(`/products/${productId}/edit`)
  }

  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      await deleteProductById(productId)
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  const handleCreateProduct = () => {
    router.push('/products/create')
  }

  if (!authorized) {
    return (
      <div className={styles.unauthorizedMessage}>
        {unauthorized
          ? 'Unauthorized Access. Please log in as a seller to view this page.'
          : 'Loading...'}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Seller Listing Page</h1>
      <button
        onClick={handleCreateProduct}
        className={styles.addProductButton}
      >
        Add New Product
      </button>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <Image
            src={product.image.url}
            alt={product.name}
            width={200}
            height={200}
            className={styles.productImage}
            unoptimized
          />
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
          <p className={styles.seller}>Seller ID: {product.sellerId}</p>
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
