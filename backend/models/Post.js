const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const postSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    default: uuidv4
  },
  label: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 160
  },
  like: {
    type: String,
    required: false,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }],
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

module.exports = mongoose.model("posts", postSchema);