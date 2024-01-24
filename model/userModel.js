const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "plese add the user name"],
  },
  email: {
    type: String,
    required: [true, "plese add the Email"],
    unique: [true, "already useded this Email"],
  },
  password: {
    type: String,
    required: [true, "plese add the password"],
  },
});

module.exports =mongoose.model('User',userScheme)