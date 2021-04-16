const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')

//getting all users
// router.get('/', async (req, res) => {
//     try {
//         cosnt users = await User.find()
//         res.json(users)
//     } catch(err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// communicate the URL to the front end.

User.findById(); //example to find a user

//getting one user
router.get("/users/:id", async (req, res) => {
  console.log("hello friend");
  console.log(req.params.id);
  const user = await User.findById(req.params.id).exec();
  res.status(200).json(user);
});
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send("hello");
});
//creating user
router.post("/users", async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    displayName: req.body.displayName,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//updating user
router.patch("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  console.log(user);
  if (req.body.name != null) {
    user.name = req.body.name;
  }
  if (req.body.displayName != null) {
    user.displayName = req.body.displayName;
  }
  if (req.body.password != null) {
    user.password = req.body.password;
  }
  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting user
router.delete("/users/:id",  async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).exec();
    console.log(user)
  try {
    res.json({ message: "user has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//login 
router.post('/login', (req, res) => {
    //Authenticate User

    const name = req.body.name
    const user = {name: name}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ') [1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


// source: https://www.youtube.com/watch?v=cwa6LciFPmA

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
