const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({
        message: "Invalid Fields!",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return response
        .status(409)
        .json({ errorMessage: "User Already Exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    await userData.save();
    res
      .status(201)
      .json({ message: "User Successfully Saved to DataBase!", success: true });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Bad Request ! Invalid Credentials" });
    }

    const userDetail = await User.findOne({ email: email });
    if (!userDetail)
      return res.status(409).json({ message: "User not Found !" });

    const verifyPassword = await bcrypt.compare(password, userDetail.password);
    if (!verifyPassword)
      return res.status(409).json({ message: "Password Mismatch!" });

    const token = jwt.sign({ userId: userDetail._id }, process.env.SECRET_KEY);
    // To set the cookies
    res.cookie("token", token, { HttpOnly: true });

    res.status(200).json({
      name: name,
      email: email,
      // token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
