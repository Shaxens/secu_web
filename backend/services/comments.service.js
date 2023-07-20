const Comments = require("../models/Comments");

exports.deleteComments = (uuid) => {
  return Comments.findOneAndDelete({ uuid }).exec()
}

exports.getCommentsByUuidAndUserId = (uuid, userId) => {
  return Comments.findOne({ uuid, userId }).populate({ path: 'userId', select: 'uuid fullname', ref: 'users', foreignField: 'uuid' }).lean().exec();
}

exports.getAllComments = () => {
  return Comments.find().populate({ path: 'userId', select: '_id uuid fullname', ref: 'users', foreignField: 'uuid' }).exec()
}

exports.getCommentsByUserId = (userId) => {
  return Comments.find({ userId }).populate({ path: 'userId', select: '_id fullname', foreignField: 'uuid' }).exec();
};

exports.createComments = (content, userId) => {
  return Comments.create({ content, userId })
}