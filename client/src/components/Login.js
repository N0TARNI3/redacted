import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.svg'
import Label from './tokens/Label'
import axios from 'axios'

const Login = () => {
  //redirect to file upload if user is currently logged in
  if(sessionStorage['user'] != null){
    window.open("/upload","_self")
  }
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginURL = `/api/user/login?email=${email}&password=${password}`;
 
  const login = async e => {
    e.preventDefault();
    try  {
      const res = await axios.get(loginURL);
      if(!res.data){
        alert("Wrong credentials. Please try again.");
      } else{
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        window.open("/upload","_self")
      }
    }catch(err){
      if(err.response.status === 500) {
        alert('There was a problem with the server');
      } else if (err.response.status === 400) {
        alert("Wrong credentials. Please try again.");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="flex">
        <img src={logo} className="logo"/>
        <h4 className='h4'  style={{width: "300px", textAlign: "center"}}>Electronic Health Record (EHR) De-identification Tool</h4>
        <form className="flex inner-flex" onSubmit={login}>
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => {setEmail(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" onChange={(e) => {setPassword(e.target.value);}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop: "8px"}}>Login</button>
        </form>
        <p className='lbl lbl-light'>Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}

export default Login