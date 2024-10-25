import React from 'react'

type AddToCartButtonProps = {
  onClick: () => void
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="addToCartButton">
    Add to Cart
  </button>
)

export default AddToCartButton
