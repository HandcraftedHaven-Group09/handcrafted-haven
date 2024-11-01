'use client'
import { useState, useEffect } from 'react'
import styles from '@/app/ui/product/new_product.module.css'
import { updateProduct, uploadImage, fetchProductById, fetchCategories } from '@/app/lib/actions'
import BackButton from '@/app/ui/product/components/back_button'
import { useRouter } from 'next/navigation'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    discountPercent: '',
    sellerId: 1,
    image: '', 
  })

  const [images, setImages] = useState<FileList | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadProductData = async () => {
      const fetchedProduct = await fetchProductById(params.id)
      setProductData({
        name: fetchedProduct.name,
        description: fetchedProduct.description,
        price: fetchedProduct.price.toString(),
        category: fetchedProduct.category,
        discountPercent: fetchedProduct.discountPercent?.toString() || '',
        sellerId: fetchedProduct.sellerId,
        image: fetchedProduct.image?.url || '', // Load the existing image URL
      })
    }

    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories()
      setCategories(fetchedCategories.map((c) => c.category))
    }

    loadProductData()
    loadCategories()
  }, [params.id])

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
      let imageUrl = productData.image || '' 

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

      await updateProduct(params.id, productPayload)
      alert('Product updated successfully!')

      // Redirect to product listing page
      router.push('/products/listing')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error updating the product')
    }
  }

  return (
    <div className={styles.formContainer}>
      <BackButton backTo='/products/listing' className={styles.backButton} /> {/* Button to return to the list of products */}
      <h1 className={styles.title}>Edit Product</h1>
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
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

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
          Update Product
        </button>
      </form>
    </div>
  )
}
