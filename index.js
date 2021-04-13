require("dotenv").config();

const usersRouter = require("./routes/users");
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://scottT:hello123@cluster0.yjz23.mongodb.net/kapstone?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("hello you are connected to db")); //naming the database "users"
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

// maybe add middleware *see below*

app.use(express.json());

app.use(function (req, res, next) {
  //Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.use("/users", usersRouter);

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
