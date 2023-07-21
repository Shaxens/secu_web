const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const commentSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    default: uuidv4
  },
  content: {
    type: String,
    required: true,
    index: true
  },
  like: {
    type: String,
    required: false,
    default: 0
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
})

module.exports = mongoose.model("comments", commentSchema);