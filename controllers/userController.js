const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    // throw new Error("All fields are required");
  }
  const userAviable = await User.findOne({ email });
  if (userAviable) {
    res.status(400);
    // throw new Error("Already available");/
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const user = await User.create({
    userName,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  }else{
    res.status(404);
  }
  res.json({ message: "Register the user" });
});

module.exports = registerUser;
