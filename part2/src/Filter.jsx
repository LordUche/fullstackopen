import React from 'react'

const Filter = ({searchString, onChange}) => {
  return (
    <p>
      filter shown with{' '}
      <input value={searchString} onChange={onChange} />
    </p>
  )
}

export default Filter
