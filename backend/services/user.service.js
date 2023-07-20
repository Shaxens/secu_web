const User = require("../models/User");

exports.getUserById = (uuid) => {
  return User.findOne({ uuid })
}

exports.getUserByUsername = (username) => {
  return User.findOne({ username })
}

exports.createUser = (user) => {
  return User.create({ ...user });
}