import { useState } from 'react'
import styles from './product_search.module.css'

type SearchProps = {
  onSearch: (term: string) => void
}

export default function ProductSearch({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </div>
  )
}
