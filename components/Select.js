// you can use React.forwardRef to pass the ref too
import React from 'react'

// eslint-disable-next-line react/display-name
const Select = () => React.forwardRef(
  (
    { onChange, onBlur, name, label, items = ['Hmm, no select values...'] },
    ref
  ) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  )
)

export default Select
