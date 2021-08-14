const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "99999 years",
  });
  //   console.log(token);
  return token;
};

module.exports = generateToken;
