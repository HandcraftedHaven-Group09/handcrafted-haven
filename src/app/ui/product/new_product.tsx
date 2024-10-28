'use client' 

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './new_product.module.css'
import { createNewProduct, uploadImage, fetchCategories } from '../../lib/actions'

export default function NewProductForm() {
  const router = useRouter()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    discountPercent: '',
    sellerId: 1,
  })

  const [images, setImages] = useState<FileList | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = ''

      if (images && images.length > 0) {
        const formData = new FormData()
        formData.append('file', images[0])
        const response = await uploadImage(formData)
        imageUrl = response.url
      }

      const productPayload = {
        ...productData,
        price: parseFloat(productData.price),
        discountPercent: parseInt(productData.discountPercent, 10),
        image: imageUrl,
      }

      await createNewProduct(productPayload)
      alert('Product created successfully!')
      // Redirect to product listing page
      router.push('/products/listing')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating the product')
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories()
      setCategories(fetchedCategories.map((c) => c.category))
    }

    getCategories()
  }, [])

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          required
          className={styles.input}
        />

        <label htmlFor="description" className={styles.label}>Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          required
          className={styles.input}
        />

        <label htmlFor="price" className={styles.label}>Price (USD):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          required
          step="0.01"
          min="0"
          className={styles.input}
        />

        <label htmlFor="category" className={styles.label}>Category:</label>
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
          className={styles.select}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="discountPercent" className={styles.label}>Discount (%):</label>
        <input
          type="number"
          id="discountPercent"
          name="discountPercent"
          value={productData.discountPercent}
          onChange={handleInputChange}
          min="0"
          max="100"
          className={styles.input}
        />

        <label htmlFor="images" className={styles.label}>Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className={styles.fileInput}
        />

        <button type="submit" className={styles.submitButton}>Create Product</button>
      </form>
    </div>
  )
}
