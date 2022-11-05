import React, {useState} from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4.js'
import Button from './tokens/Button.js'
import Label from './tokens/Label.js'
import axios from 'axios'
import PropTypes from 'prop-types'


const SignUp = () => {
  //redirect to file upload if user is currently logged in
  if(sessionStorage['user_id'] != null){
    window.open("/upload","_self")
  }
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const roleID = urlParams.get('role')
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

    const signup = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role_id', roleID);
    
        try  {
          const res = await axios.post('/signup', formData);
          sessionStorage['user_id'] = JSON.stringify(res.data.id);
          window.open("/upload","_self")
        }catch(err){
          if(err.response.status === 500) {
            console.log('There was a problem with the server');
          } else {
            console.log(err.response.data.msg);
          }
        }
      };

  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <H4 text="Create New Account" />
        <form className="flex" onSubmit={signup}>
            <div className='form-control'>
                <Label text="first name" type="lbl-solid" />
                <input type="text" placeholder="John" onChange={(e) => {setFirstName(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="last name" type="lbl-solid" />
                <input type="text" placeholder="Doe" onChange={(e) => {setLastName(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => {setEmail(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" onChange={(e) => {setPassword(e.target.value);}}/>
            </div>
            <input type="submit" title="Sign Up" className="btn btn-primary"/>
        </form>
    </div>
    
  )
}

export default SignUp