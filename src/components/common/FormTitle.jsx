import React from 'react'

const FormTitle = ({children, className = ""}) => {
  return (
    <div className={`text-xl font-bold" ${className}`}>{children}</div>
  )
}

export default FormTitle