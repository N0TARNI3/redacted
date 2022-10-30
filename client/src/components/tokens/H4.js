import React from 'react'

const H4 = ({text, align}) => {
  return (
    <h4 className="h4" align={align}>{text}</h4>
  )
}

H4.defaultProps ={
  align: 'left'
}

export default H4