import React from 'react'
import logo from '../img/logo.svg'
import folder from '../img/folder.png'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'
import H1 from './tokens/H1'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = React.useState(null);
  const handleSubmit = async(event) => {
    console.log("Submitted!")
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", file);
    axios
    .post("http://localhost:5000/upload", formData)
    .then((res) => {
      alert("File upload success");
    })
    .catch((err) => alert("File Upload Error"));
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    document.getElementById("form").submit();
  }


  return (
    <div className="flex">
        <div className='row'>
            <H1 text="Welcome to"/>
            <img src={logo} className="logo" />
        </div>
        <div className='flex-input'>
          <div className='flex file-upload'>
              <img src={folder} height="64px"/>
              <H4 text="Drag and drop your EHR in PDF format here to start uploading" align="center"/>
              <Label text="OR" type="lbl-light" />
              <Button title="Browse Files" type="btn-primary"/>
          </div>
          <form onSubmit={handleSubmit} id="form">
            <input type="file" accept="application/pdf" className='file-input' onChange={handleFileSelect}/>
          </form>
        </div>
    </div>
  )
}

export default FileUpload