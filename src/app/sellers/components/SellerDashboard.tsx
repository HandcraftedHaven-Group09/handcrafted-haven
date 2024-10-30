// SellerDashboard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';  

interface Product {
    description: string;
    category: string;
    images: string[];
}

// Update props to accept NextAuth Session
interface SellerDashboardProps {
    session: Session;
}

export default function SellerDashboard({ session }: SellerDashboardProps) {
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [productImages, setProductImages] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            productImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
        };
    }, [productImages]);

    const handleAddProduct = () => {
        if (productDescription && productCategory && productImages.length > 0) {
            const newProduct: Product = {
                description: productDescription,
                category: productCategory,
                images: productImages,
            };
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setProductDescription('');
            setProductCategory('');
            setProductImages([]);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setProductImages((prevImages) => [...prevImages, ...imageUrls]);
        }
    };

    return (
        <div>
            <h1>Welcome, {session.user?.name || 'Seller'}!</h1>
            <h2>Your Seller Profile</h2>
            <h3>Add a Product</h3>
            
            <label>Product Description:</label>
            <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your handcrafted item..."
            />
            
            <label>Product Category:</label>
            <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
            >
                <option value="">Select a category</option>
                <option value="jewelry">Jewelry</option>
                <option value="home-decor">Home Decor</option>
                <option value="clothing">Clothing</option>
                <option value="art">Art</option>
                <option value="toys">Toys</option>
                <option value="craft-supplies">Craft Supplies</option>
            </select>

            <div style={{ padding: '20px', margin: '10px 0' }}>
                <label>Upload Images:</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                />
            </div>
            
            <h4>Selected Images:</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
                {productImages.map((image, index) => (
                    <img key={index} src={image} alt={`Product Image ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                ))}
            </div>
            
            <button onClick={handleAddProduct}>Add Product</button>
            
            <h3>Your Products:</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <strong>Description:</strong> {product.description} <br />
                        <strong>Category:</strong> {product.category} <br />
                        <strong>Images:</strong> {product.images.length} image(s) uploaded
                    </li>
                ))}
            </ul>

            <h3>Total Products: {products.length}</h3>

            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}
