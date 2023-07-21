const Comments = require("../models/Comments");

exports.deleteComments = (objectId) => {
  return Comments.findOneAndDelete({ _id: objectId }).exec();
};

exports.getCommentsByUuidAndUserId = (objectId, userId) => {
  return Comments.findOne({ _id: objectId, userId })
    .populate({ path: 'userId', select: 'uuid fullname', ref: 'users', foreignField: '_id' })
    .lean()
    .exec();
};

exports.getAllComments = () => {
  return Comments.find()
    .populate({ path: 'userId', select: '_id uuid fullname', ref: 'users', foreignField: '_id' })
    .exec();
};

exports.getCommentsByUserId = (userId) => {
  return Comments.find({ userId })
    .populate({ path: 'userId', select: '_id fullname', foreignField: '_id' })
    .exec();
};

exports.createComments = (content, userId) => {
  return Comments.create({ content, userId });
};
