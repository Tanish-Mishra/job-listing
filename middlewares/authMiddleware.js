const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")
  
    // const token = req.cookies.token;
    console.log("Token: ",token)

    if (!token && token.length < 2) {
      res.status(401).json({
        message: "Unauthroized Access!",
      });
    }
    const decode = jwt.verify(token[1],process.env.SECRET_KEY) // If any issue it returns a error
    // const decode = jwt.verify(token, process.env.SECRET_KEY);
    const isValidUser = await User.findById(decode.userId);
    if (!isValidUser) {
      res.status(401).json({
        message: "False Token!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
