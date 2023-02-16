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
import H4 from './tokens/H4.js'
import Label from './tokens/Label.js'
import axios from 'axios'

//Main React Component object
const SignUp = () => {
  //redirect to file upload if user is currently logged in
  if(sessionStorage['user'] != null){
    window.open("/upload","_self")
  }
  
  //States for this component, mainly sign up inputs
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();  
  const [roleID, setRoleID] = useState(1);
  const roles =[["Researcher", 2], ["Doctor's Secretary", 5], ["Nurse Assistant", 3], ["Nurse", 4], ["Doctor", 1]];  
  const [userExist, setUserExist] = useState(false);

  //function that will handle the creation of new user
  const signup = async e => {
    var signupURL = `api/user/create?first_name=${firstName}&last_name=${lastName}&email=${email}&password=${password}&role_id=${roleID}`;
      e.preventDefault();
      //Connect to axios (form handler)    
      try  {
        const res = await axios.post(signupURL);
        sessionStorage.setItem("user", JSON.stringify(res.data.data)); //store successfully created new user to browser's session storage
        window.open("/upload","_self") //redirect to file upload page
      }catch(err){ //error handling for creation of new user
        if(err.response.status === 500) {
          alert('There was a problem with the server');
        } else if(err.response.status === 400) {
          setUserExist(true);
        } else {
            console.log(err.response.data.msg);
        }
       }
  };

  //HTML to be rendered for this component
  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Create New Account" />
        <form className="flex inner-flex" onSubmit={signup}>
            {userExist ? (
              <p className='lbl lbl-error' style={{color: "red"}}><img src={warning} style={{height: "12px", marginRight: "8px"}}/>User already exists. <Link to="/">Log In.</Link></p>
            ):(null)
            }            
            <div className='row'>
              <div className='form-control'>
                  <Label text="first name" type="lbl-solid" />
                  <input type="text" placeholder="John" onChange={(e) => {setFirstName(e.target.value);}} style={{width: "100px"}}/>
              </div>
              <div className='form-control'>
                  <Label text="last name" type="lbl-solid" />
                  <input type="text" placeholder="Doe" onChange={(e) => {setLastName(e.target.value);}} style={{width: "100px"}}/>
              </div>
            </div>
            
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => {setEmail(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" minLength="6" onChange={(e) => {setPassword(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="Role" type="lbl-solid" />
                <select onChange={(e) => setRoleID(e.target.value)}>
                    {roles.map((role) => (
                      <option value={role[1]}>
                        {role[0]}
                      </option>
                    ))}
                  </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop: "8px"}}>Sign Up</button>
        </form>
    </div>
    
  )
}

export default SignUp