const mongoose = require("mongoose");

const lostpersonScheme = mongoose.Schema({
  username: {
    type: String,
    required: [true, "plese add the user name"],
  },
  email: {
    type: String,
    required: [true, "plese add the Email"],
  },
  email: {
    type: String,
    required: [true, "plese add the password"],
  },
  lost: {
    type: Boolean,
  },
  found: {
    type: Boolean,
  },
  thing: {
    type: String,
  },
  longitude: {
    type: Number,
  },
  lettitude: {
    type: Number,
  },
});

module.exports = mongoose.model("User", lostpersonScheme);
