const User = require("../models/User");

exports.getUserById = (objectId) => {
  return User.findOne({ _id: objectId }).exec();
};

exports.getUserByUsername = (username) => {
  return User.findOne({ username }).exec();
};

exports.createUser = (user) => {
  return User.create({ ...user });
};
