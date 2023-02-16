/* 
Program:        Login.js
Programmer/s:   Arnie Fraga
Description:    React component for the login section of the web app
Date Written:   Oct. 03, 2022
Last Modified:  Feb. 15, 2023
Data:           React Components, HTML DOM Elements (FormData), JSON Objects
*/

//Import needed components and libraries
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import warning from '../img/warning.png'
import Label from './tokens/Label'
import axios from 'axios'

//Main React Component object
const Login = () => {
  //redirect to file upload page if user is already logged in
  if(sessionStorage['user'] != null){
    window.open("/upload","_self")
  }
  
  //States for this component
  const [email, setEmail] = useState(); //state that will handle email entered
  const [password, setPassword] = useState(); //state that will handle password entered
  const loginURL = `/api/user/login?email=${email}&password=${password}`; //variable for the link with login parameters
  const [invalidUser, setInvalidUser] = useState(false); //state that will handle if login is invalid
 
  //Function that will handle login
  const login = async e => {
    e.preventDefault();

    //Connect to axios (form handler)
    try  {
      const res = await axios.get(loginURL);
      //if login is invalid
      if(!res.data){;      
        setInvalidUser(true);
      } else{
        sessionStorage.setItem("user", JSON.stringify(res.data.data)); //set user on browser session storage
        window.open("/upload","_self") //redirect to file upload page
      }
    }catch(err){ //error handling for invalid login
      if(err.response.status === 500) {
        alert('There was a problem with the server');
      } else if (err.response.status === 400) {
        setInvalidUser(true);
        console.log(invalidUser)
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  //HTML to be rendered for this component
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <h4 className='h4'  style={{width: "300px", textAlign: "center"}}>Electronic Health Record (EHR) De-identification Tool</h4>
        <form className="flex inner-flex" onSubmit={login}>
            {invalidUser ? (
              <p className='lbl lbl-error' style={{color: "red"}}><img src={warning} style={{height: "12px", marginRight: "8px"}}/>Invalid user credentials, please try again.</p>
            ):(null)
            }
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => {setEmail(e.target.value);}} required/>
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" onChange={(e) => {setPassword(e.target.value);}} required/>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop: "8px"}}>Login</button>
        </form>
        <p className='lbl lbl-light'>Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}

export default Login