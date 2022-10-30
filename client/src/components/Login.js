import React from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'

const Login = () => {
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Electronic Health Record (EHR) De-identification Tool" />
        <form className="flex">
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" />
            </div>
            <Button title="Login" type="btn-primary"/>
        </form>
        <Label text="Don’t have an account yet? Sign up" type="lbl-light" />
    </div>
  )
}

export default Login