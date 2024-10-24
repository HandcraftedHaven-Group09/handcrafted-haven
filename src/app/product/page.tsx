"use client"
import { useState } from "react"
import Image from "next/image"
import React from "react"

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string
}

const product: Product = {
    id: 1,
    name: 'Handwoven Cotton Scarf',
    description: 'A cozy and soft cotton scarf handwoven with vibrant colors.',
    price: 35,
    image: "/product/scarf_cotton.webp",
    category: 'Fashion Accessories'
}

export default function ProductPage() {
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        console.log(`${quantity} of ${product.name} added to the cart`)
    }

    return (
        <div className="container">
            <div className="image-section">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400} 
                    height={400} 
                    className="product-image"
                    priority 
                />
            </div>

            <div className="details-section">
                <h1>{product.name}</h1>
                <p className="category">{product.category}</p>
                <p className="description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>

                <div className="cart-section">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                    />
                    <button onClick={handleAddToCart} className="add-to-cart-button">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}