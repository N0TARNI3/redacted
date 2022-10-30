import React from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4.js'
import Button from './tokens/Button.js'
import Label from './tokens/Label.js'


const SignUp = () => {
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Create New Account" />
        <form className="flex">
            <div className='form-control'>
                <Label text="full name" type="lbl-solid" />
                <input type="text" placeholder="John Doe" />
            </div>
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" />
            </div>
            <Button title="Sign Up" type="btn-primary"/>
        </form>
    </div>
  )
}

export default SignUp