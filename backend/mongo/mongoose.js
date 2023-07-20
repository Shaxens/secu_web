const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://arthurvietti:V2vWfk3UybMVFsdI@cluster0.y2rocgb.mongodb.net/`)
    console.log("Connected to mongo DB")
    mongoose.set('debug', true);
  } catch (e) {
    console.error(`Err connect to db : ${e}`)
    process.exit(1);
  }
}

module.exports = connectDB