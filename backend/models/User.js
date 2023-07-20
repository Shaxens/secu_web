const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    default: uuidv4
  },
  username: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  fullname: {
    type: String,
    required: false,
    default() {
      return `${this.firstname} ${this.lastname}`;
    }
  },
  bio: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model("users", userSchema);