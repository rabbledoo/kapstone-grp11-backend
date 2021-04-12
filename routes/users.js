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

User.findById(); //example to find a user

//getting one user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});
router.get("/", (req, res) => {
  res.send("hello");
});
//creating user
router.post("/", async (req, res) => {
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
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.displayName != null) {
    res.user.displayName = req.body.displayName;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
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
