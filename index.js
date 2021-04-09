require('dotenv').config()

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true})   //naming the database "users"
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// maybe add middleware *see below*

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


// app.get("/", (req, res) => {
//   console.log("get request recieved");
//   res.send("Hello Postman!");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(function (req, res, next) {
//   //Website you wish to allow to connect
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   next();
// });

//source: https://www.youtube.com/watch?v=fgTGADljAeg