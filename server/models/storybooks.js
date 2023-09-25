const mongoose = require("mongoose");

const storybooksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverURL: {
      type: String,
      required: true,
    },

    bookURL: {
      type: String,
      required: true,
    },
    
    // level: {
    //   type: String,
    //   required: true,
    // },
    // category: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("storybooks", storybooksSchema);
