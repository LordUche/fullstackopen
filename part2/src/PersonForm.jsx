import React from 'react'

const PersonForm = ({name, number, onNameChange, onNumberChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
          <input value={name} onChange={onNameChange} required />
      </div>
      <div>
        number:
          <input value={number} onChange={onNumberChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
