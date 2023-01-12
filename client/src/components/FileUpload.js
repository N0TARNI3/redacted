import React, {useState} from 'react'
import logo from '../img/logo.svg'
import folder from '../img/folder.png'
import H4 from './tokens/H4'
import H1 from './tokens/H1'
import axios from 'axios'

const FileUpload = () => {
  //redirect to login if no user is logged in
  if(sessionStorage['user'] == null){
    window.open("/","_self")
  }
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Drag and drop your EHR in PDF format here to start uploading')
  const [isLoading, setIsLoading] = useState(false);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try  {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      sessionStorage.setItem("text", res.data);
      var text = res.data;
      var cleanText = text.replaceAll("\n", " ");
      cleanText = cleanText.replaceAll(/  +/g," ");
      try  {
          const res = await axios.get('/api/model', {
            params: {
              word: cleanText,
              file_name: filename
            }
          });
          sessionStorage.setItem("results", JSON.stringify(res.data));
      }catch(err){
          if(err.response.status === 500) {
            console.log('There was a problem with the server');
          } else {
            console.log(err.response.data.msg);
          }
      }
      window.open("/results","_self")
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