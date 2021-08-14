const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/handleToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (userFound) {
    res.status(400);
    throw new Error("User Already Exists");
  } else {
    const newUser = await User.create({ name, email, password });
    if (newUser)
      res.status(201).json({
        id: newUser.id,
        name,
        email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser.id),
      });
    else {
      res.status(500);
      throw new Error("Some Error Has Occured");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.comparePassword(password)))
    res.json({
      id: userFound.id,
      name: userFound.name,
      email,
      isAdmin: userFound.isAdmin,
      token: generateToken(userFound.id),
    });
  else {
    res.status(401);
    throw new Error("Invalid User Credentials");
  }
});

module.exports = { registerUser, loginUser };
