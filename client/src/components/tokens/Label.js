import React from 'react'

const Label = ({text, type}) => {
  return (
    <p className={"lbl "+type}>{text}</p>
  )
}

export default Label