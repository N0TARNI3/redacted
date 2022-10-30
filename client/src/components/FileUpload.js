import React, {useState} from 'react'
import logo from '../img/logo.svg'
import folder from '../img/folder.png'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'
import H1 from './tokens/H1'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Drag and drop your EHR in PDF format here to start uploading')
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try  {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({fileName, filePath});
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
        <div className='row'>
            <H1 text="Welcome to"/>
            <img src={logo} className="logo" />
        </div>
        <div className='flex-input'>
          <form onSubmit={onSubmit} id="form">
            <input type="file" accept="application/pdf" className='file-input' onChange={onChange} required/>
          <div className='flex file-upload'>
              <img src={folder} height="64px"/>
              <H4 text={filename} align="center"/>
              <input type="submit" class="btn btn-primary"/>
          </div>
          </form>
        </div>
    </div>
  )
}

export default FileUpload