import React from 'react'

type QuantityInputProps = {
  value: number
  onChange: (value: number) => void
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => (
  <div>
    <label htmlFor="quantity">Quantity:</label>
    <input
      type="number"
      id="quantity"
      name="quantity"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min="1"
    />
  </div>
)

export default QuantityInput
