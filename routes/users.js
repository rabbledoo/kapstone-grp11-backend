const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
//getting user friends list
//getting

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
