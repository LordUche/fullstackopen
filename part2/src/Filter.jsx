import React from 'react'

const Filter = ({searchString, onChange}) => {
  return (
    <p>
      <span>filter shown with </span>
      <input value={searchString} onChange={onChange} />
    </p>
  )
}

export default Filter
