'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './new_product.module.css'
import { createNewProduct, uploadImage, fetchCategories, authenticateSeller } from '../../lib/actions'
import BackButton from './components/back_button'

// Função para sanitizar strings de entradas
function sanitizeInput(input: string): string {
  const div = document.createElement('div')
  div.innerText = input
  return div.innerHTML
}

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
  const [authorized, setAuthorized] = useState(false)
  const [unauthorized, setUnauthorized] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

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
          getCategories()
        }
      } catch (error) {
        console.error('Access denied:', error)
        setUnauthorized(true)
      }
    }

    checkAuthorization()
  }, [])

  const getCategories = async () => {
    const fetchedCategories = await fetchCategories()
    setCategories(fetchedCategories.map((c) => c.category))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
      [name]: sanitizeInput(value), // Sanitiza a entrada do usuário
    })
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Limpa a mensagem de erro ao digitar
    }))
  }

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {}
    if (!productData.name) newErrors.name = 'Name is required.'
    if (!productData.description) newErrors.description = 'Description is required.'
    if (!productData.price) newErrors.price = 'Price is required.'
    if (!productData.category) newErrors.category = 'Category is required.'
    if (!images || images.length === 0) newErrors.images = 'At least one image is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateFields()) return

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
      router.push('/products/listing')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating the product')
    }
  }

  if (unauthorized) {
    return <p className={styles.unauthorizedMessage}>Unauthorized Access. Please log in as a seller to access this page.</p>
  }

  if (!authorized) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.formContainer}>
      <BackButton backTo='/products/listing' />
      <h1 className={styles.title}>Create New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <label htmlFor="description" className={styles.label}>Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className={styles.input}
        />
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        <label htmlFor="price" className={styles.label}>Price (USD):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          step="0.01"
          min="0"
          className={styles.input}
        />
        {errors.price && <p className={styles.error}>{errors.price}</p>}

        <label htmlFor="category" className={styles.label}>Category:</label>
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className={styles.select}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className={styles.error}>{errors.category}</p>}

        <label htmlFor="images" className={styles.label}>Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={(e) => {
            setImages(e.target.files)
            setErrors((prevErrors) => ({
              ...prevErrors,
              images: '',
            }))
          }}
          className={styles.fileInput}
        />
        {errors.images && <p className={styles.error}>{errors.images}</p>}

        <button type="submit" className={styles.submitButton}>Create Product</button>
      </form>
    </div>
  )
}
