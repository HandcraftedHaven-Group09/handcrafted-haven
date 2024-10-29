'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchProductAll } from '@/app/lib/actions'
import styles from '@/app/products/product_page.module.css'
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
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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
        sellerId: product.sellerId,
        image: { url: product.image.url },
      }))
      setProducts(productData)
      setFilteredProducts(productData)
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product)
    setShowConfirmation(true)

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = cart.findIndex((item: { id: number }) => item.id === product.id)

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantities[product.id] || 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantities[product.id] || 1,
        image: product.image.url,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }))
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

  const handleContinueShopping = () => {
    setShowConfirmation(false)
  }

  const handleGoToCart = () => {
    router.push('/products/cart')
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

      {showConfirmation && selectedProduct && (
        <div className={styles.confirmationModal}>
          <p>{quantities[selectedProduct.id] || 1} of {selectedProduct.name} added to the cart!</p>
          <button onClick={handleContinueShopping} className={styles.continueButton}>
            Continue Shopping
          </button>
          <button onClick={handleGoToCart} className={styles.cartButton}>
            Go to Cart
          </button>
        </div>
      )}
    </div>
  )
}
