const Post = require("../models/Post");

exports.deletePost = (uuid) => {
  return Post.findOneAndDelete({ uuid }).exec()
}

exports.getPostByUuidAndUserId = (uuid, userId) => {
  return Post.findOne({ uuid, userId }).populate({ path: 'userId', select: 'uuid fullname', ref: 'users', foreignField: 'uuid' }).lean().exec();
}

exports.getAllPost = () => {
  return Post.find().populate({ path: 'userId', select: '_id uuid fullname', ref: 'users', foreignField: 'uuid' }).exec()
}

exports.getPostsByUserId = (userId) => {
  return Post.find({ userId }).populate({ path: 'userId', select: '_id fullname', foreignField: 'uuid' }).exec();
};

exports.getPostById = (uuid) => {
  return Post.findOne({ uuid })
    .populate({ path: 'userId', select: 'uuid fullname', ref: 'users', foreignField: 'uuid' })
    .populate({ path: 'comments', ref: 'comments' })
    .exec();
};

exports.getPostByPostname = (post) => {
  return Post.findOne({ post }).exec()
}

exports.createPost = (label, content, userId, comments) => {
  return Post.create({ label, content, userId, comments });
}