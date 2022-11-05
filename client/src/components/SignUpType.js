import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import H4 from './tokens/H4'
import Button from './tokens/Button'

const SignUpType = () => {  
  //redirect to file upload if user is currently logged in
  if(sessionStorage['user_id'] != null){
    window.open("/upload","_self")
  }
  
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Create an Account as:" />
        <Link to="/signup?role=1" className='btn btn-secondary'>Doctor</Link>
        <Link to="/signup?role=2" className='btn btn-secondary'>Researcher</Link>
    </div>
  )
}

export default SignUpType