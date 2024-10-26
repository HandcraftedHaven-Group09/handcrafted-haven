import React from 'react'

type DeleteButtonProps = {
  onDelete: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => (
  <button onClick={onDelete} className="deleteButton">
    Delete
  </button>
)

export default DeleteButton
