const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const verifyUser = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = await User.findById(id);
      if (foundUser) {
        req.userId = foundUser._id;
        return next();
      } else {
        res.status(401);
        throw new Error("Un-Authenticated User");
      }
    } catch (err) {
      res.status(401);
      throw new Error("Un-Authenticated User");
    }
  } else {
    res.status(401);
    throw new Error("Un-Authenticated User");
  }
});

module.exports = verifyUser;
