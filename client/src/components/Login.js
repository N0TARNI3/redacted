import React, {useState} from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ user, setUser ] = useState({});

  const login = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try  {
      const res = await axios.post('/login', formData);
      if(!res.data){
        alert("Wrong credentials. Please try again.");
      } else{
        setUser(res.data);
      }
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
        <H4 text="Electronic Health Record (EHR) De-identification Tool" align="center"/>
        <form className="flex" onSubmit={login}>
            <div className='form-control'>
                <Label text="email" type="lbl-solid" />
                <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => {setEmail(e.target.value);}}/>
            </div>
            <div className='form-control'>
                <Label text="password" type="lbl-solid" />
                <input type="password" placeholder="6 characters required" onChange={(e) => {setPassword(e.target.value);}}/>
            </div>
            <input type="submit" title="Login" className="btn btn-primary"/>
        </form>
        <Label text="Don’t have an account yet? Sign up" type="lbl-light" />
    </div>
  )
}

export default Login