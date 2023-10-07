const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
//questions: this.state.questions,
//category: this.state.categoryVal

const quizSchema = mongoose.Schema({
  questions: [
    {
      type: Object,
      contains: {
        answers: { type: Array },
        correctAnswer: String,
        questionName: String,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  scores: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("quiz", quizSchema);
