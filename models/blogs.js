const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    mainBody: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
      // Decided to manually set a date when the blog is added rather than the time it was first uploaded using default:Date.now
    }
  }
  // { timestamps: true },  //do i need this?
)

module.exports = mongoose.model("Blogs", blogSchema);
