const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileUpload') 

const app = express();

require('dotenv').config();

//db connection
mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('Server connected'))
      .catch(() => console.log("Could't connect whit the server"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'/tmp',
  createParentPath: true
}))
// app.use(fileUpload());

//routes 
app.use('/api/fields', require('./routes/field'));

//port connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server Running')
})
