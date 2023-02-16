/* 
Program:        FileUpload.js
Programmer/s:   Arnie Fraga
Description:    React component for the file upload section of the web app
Date Written:   Oct. 03, 2022
Last Modified:  Feb. 15, 2023
Data:           React Components, HTML DOM Elements (FormData), JSON objects
*/

//Import needed components and libraries
import React, {useState} from 'react'
import logo from '../img/logo.svg'
import folder from '../img/folder.png'
import H4 from './tokens/H4'
import H1 from './tokens/H1'
import axios from 'axios'

//Main React Component object
const FileUpload = () => {

  //redirect to login if no user is logged in
  if(sessionStorage['user'] == null){
    window.open("/","_self")
  }

  //States for this component
  const [file, setFile] = useState(); //state that will handle the uploaded file
  const [filename, setFilename] = useState('Drag and drop your EHR in PDF format here to start uploading') //state that will handle the uploaded file's file name
  const [isLoading, setIsLoading] = useState(false); //state that will handle if API is loading or not
  
  //Function for uploading of file on change
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  //Function that will handle form submit
  const onSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    //Connect to backend
    try  {
      //Convert file uploaded into text
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      //Set converted text to browser's session storage
      sessionStorage.setItem("text", res.data);

      //Clean converted text, remove unnecessary spaces.
      var text = res.data;
      var cleanText = text.replaceAll("\n", " ");
      cleanText = cleanText.replaceAll(/  +/g," ");

      //Connecting to Model API backend
      try  {
          //Assess PHI in the text
          const res = await axios.get('/api/model', {
            params: {
              word: cleanText,
              file_name: filename
            }
          });
          //Store the returned PHIs and their labels as JSON object
          sessionStorage.setItem("results", JSON.stringify(res.data));
      }catch(err){ //Error handling for model API
          if(err.response.status === 500) {
            console.log('There was a problem with the server');
          } else {
            console.log(err.response.data.msg);
          }
      }
      window.open("/results","_self") //redirect to results page
    }catch(err){ //Error handling for connecting to backend
      if(err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  //HTML to be rendered for this component
  return (
    <div className="flex">       
      {isLoading ? (
        <>        
          <H1 text="Loading..."/>
          <lottie-player src="https://assets4.lottiefiles.com/private_files/lf30_gnw4fvnq.json"  background="transparent"  speed="1"  style={{width: 250}}  loop autoplay></lottie-player>
        </>
      ):(
        <>
          <div className='row'>
              <H1 text="Welcome to"/>
              <img src={logo} style={{height: "40px"}} alt="logo"/>
          </div>
          <div className='flex-input'>
            <form onSubmit={onSubmit} id="form">
              <input type="file" accept="application/pdf" className='file-input' onChange={onChange} required/>
            <div className='flex file-upload' style={{gap: "0px"}}>
                <img src={folder} height="48px" alt="folder"/>
                <p align="center" style={{width: "300px"}}>{filename}</p>
                <input type="submit" className="btn btn-primary" style={{width: "160px"}}/>
            </div>
            </form>
          </div>
        </>
      )}     
    </div>
  )
}

export default FileUpload