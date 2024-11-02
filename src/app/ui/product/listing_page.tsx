'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { fetchProductAll, deleteProductById, } from '@/app/lib/actions'
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
  image: {
    url: string
  }
}

export default function ListingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!session) return
    
    const fetchProducts = async () => {
      setIsLoading(true)
      let response
  
      if (session.user.role === 'seller') {
        const sellerId = parseInt(session.user.id, 10)
        response = await fetchProductAll(sellerId)
      } else {
        response = await fetchProductAll()
      }
  
      const productData = response.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        discountPercent: product.discountPercent,
        discountAbsolute: product.discountAbsolute,
        sellerId: product.seller.id,
        image: { url: product.image.url },
      }))
  
      setProducts(productData)
      setFilteredProducts(productData)
      setIsLoading(false)
    }
  
    fetchProducts()
  }, [session])

  const handleSearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filtered = products.filter(
      (product) =>
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
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (confirmDelete) {
      await deleteProductById(productId)
      setProducts(products.filter((product) => product.id !== productId))
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== productId)
      )
    }
  }

  const handleCreateProduct = () => {
    router.push('/products/create')
  }

  return (
    <div className={styles.container}>
      <h1>Product Listing Page</h1>

      {isLoading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.noProducts}>
          <p>You do not have any products registered.</p>
          <button onClick={handleCreateProduct} className={styles.addProductButton}>
            Add New Product
          </button>
        </div>
      ) : (
        <>
          {/* Search component */}
          <ProductSearch onSearch={handleSearch} />
          <button
            onClick={handleCreateProduct}
            className={styles.addProductButton}
          >
            Add New Product
          </button>

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
              <p className={styles.description}>Description: {product.description}</p>
              <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
              <p className={styles.discountPercent}>Discount: {product.discountPercent}%</p>
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
        </>
      )}
    </div>
  )
}
