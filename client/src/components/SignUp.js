import React, {useState} from 'react'
import logo from '../img/logo.svg'
import H4 from './tokens/H4.js'
import Label from './tokens/Label.js'
import axios from 'axios'


const SignUp = () => {
  //redirect to file upload if user is currently logged in
  if(sessionStorage['user'] != null){
    window.open("/upload","_self")
  }
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const roleID = urlParams.get('role')
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();  
  const signupURL = `api/user/create?first_name=${firstName}&last_name=${lastName}&email=${email}&password=${password}&role_id=${roleID}`;

    const signup = async e => {
        e.preventDefault();    
        try  {
          const res = await axios.post(signupURL);          
          sessionStorage['name'] = res.data.first_name + " " + res.data.last_name;
          sessionStorage['email'] = res.data.email;
          sessionStorage['role'] =res.data.role;
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