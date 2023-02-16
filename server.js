/* 
Program:        server.js
Programmer/s:   Arnie Fraga
Description:    Backend server that will handle file upload requests
Date Written:   Oct. 03, 2022
Last Modified:  Feb. 15, 2023
Data:           HTTP Requests
*/

//Import needed libraries
const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParser = require('pdf-parse')

app.use(cors()); //middleware
app.use(express.json()); //req.body
app.use(fileUpload()); //file uploader

// Endpoint for File Upload (Parameters: HTTP Request and Response)
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  //Convert upload file into raw text, and return as HTTP response
  const file = req.files.file;
  pdfParser(file).then(result => {
    res.send(result.text);
  });
});

//Check if server is online
app.listen(5000, () => console.log('Server Started...'));