const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParser = require('pdf-parse')

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  pdfParser(file).then(result => {
    res.send(result.text);
  });
});

app.listen(5000, () => console.log('Server Started...'));