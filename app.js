const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/error')
require('dotenv').config();


const app = express();


//db connection
mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('Server connected'))
      .catch(() => console.log("Could't connect whit the server"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/notes', require('./routes/note'));

//Error Handler

app.use(errorHandler)


//port connection
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server Running')
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
})