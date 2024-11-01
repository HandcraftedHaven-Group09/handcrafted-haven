'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/products/cart/cart_page.module.css'
import BackButton from '@/app/ui/product/components/back_button'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Load the localStorage cart when loading the page
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      <BackButton backTo="/products" className={styles.backButton} />
      {cart.length > 0 ? (
        <>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className={styles.itemImage}
                />
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <h2>Total: ${calculateTotal()}</h2>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  )
}
