import React from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4'
import Button from './tokens/Button'

const SignUpType = () => {
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Create an Account as:" />
        <Button title="Doctor" type="btn-secondary"/>
        <Button title="Researcher" type="btn-secondary"/>
    </div>
  )
}

export default SignUpType