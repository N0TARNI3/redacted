const express = require('express');
const app = express();
const pool = require('./db')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParser = require('pdf-parse')

app.use(cors()); //middleware
app.use(express.json()); //req.body
app.use(fileUpload()); //file uploader

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

//Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM \"user\" WHERE email=$1 AND password=$2",
      [email, password]
    );
    console.log(user.rows[0]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, password, role_id } = req.body;
    const newUser = await pool.query(
      "INSERT INTO \"user\" (first_name, last_name, email, password, role_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [first_name, last_name, email, password, role_id]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => console.log('Server Started...'));