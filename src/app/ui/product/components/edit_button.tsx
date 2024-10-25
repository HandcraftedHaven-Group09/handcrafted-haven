import React from 'react'

type EditButtonProps = {
  onEdit: () => void
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => (
  <button onClick={onEdit} className="editButton">
    Edit
  </button>
)

export default EditButton
