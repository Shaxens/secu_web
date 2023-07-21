const Post = require("../models/Post");

exports.deletePost = (objectId) => {
  return Post.findOneAndDelete({ _id: objectId }).exec();
};

exports.getPostByIdAndUserId = (objectId, userId) => {
  return Post.findOne({ _id: objectId, userId })
    .populate({ path: 'userId', select: '_id fullname', ref: 'users' })
    .exec();
};


exports.getAllPost = () => {
  return Post.find()
    .populate({ path: 'userId', select: '_id fullname', ref: 'users' })
    .exec();
};

exports.getPostsByUserId = (userId) => {
  return Post.find({ userId })
    .populate({ path: 'userId', select: '_id fullname' })
    .exec();
};

exports.getPostById = (objectId) => {
  return Post.findOne({ _id: objectId })
    .populate({ path: 'userId', select: '_id fullname', ref: 'users' })
    .populate({ path: 'comments', populate: { path: 'userId', select: '_id fullname', ref: 'users' }, ref: 'comments' })
    .exec();
};


exports.getPostByPostname = (post) => {
  return Post.findOne({ post }).exec();
};

exports.createPost = (label, content, userId, comments) => {
  return Post.create({ label, content, userId, comments });
};
