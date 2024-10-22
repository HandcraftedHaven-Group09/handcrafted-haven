'use client'
import { useState } from 'react'
import styles from './new_product.module.css'
import { createNewProduct, uploadImage } from '../../lib/actions'

export default function NewProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    discountPercent: '',
    sellerId: 1,
  })

  const [images, setImages] = useState<FileList | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'price' || name === 'discountPercent') {
      setProductData({
        ...productData,
        [name]: value === '' ? '' : value, // Ensure empty fields don't submit empty strings for price/discount
      })
    } else {
      setProductData({
        ...productData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      let imageUrl = ''
  
      // Handle image uploads
      if (images && images.length > 0) {
        const formData = new FormData()
        formData.append('file', images[0])
  
        const response = await uploadImage(formData)
        imageUrl = response.url
      }
  
      // Prepare the product payload
      const productPayload = {
        ...productData,
        price: parseFloat(productData.price),
        discountPercent: parseInt(productData.discountPercent, 10),
        image: imageUrl, 
      }
  
      console.log('Final product data being submitted:', productPayload)
  
      // Create the new product with image
      await createNewProduct(productPayload)
      alert('Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating the product')
    }
  }
  

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price">Price (USD):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          required
          step="0.01"
          min="0"
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="discountPercent">Discount (%):</label>
        <input
          type="number"
          id="discountPercent"
          name="discountPercent"
          value={productData.discountPercent}
          onChange={handleInputChange}
          min="0"
          max="100"
        />

        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit" className={styles.submitButton}>
          Create Product
        </button>
      </form>
    </div>
  )
}
