const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//questions: this.state.questions,
//category: this.state.categoryVal
const router = require("express").Router();

const quizSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    option1: {
      type: String,
      required: true,
    },
    option2: {
      type: String,
      required: true,
    },
    option3: {
      type: String,
      required: true,
    },
    option4: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mcq: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Route to delete a quiz by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const quizId = req.params.id;

    // Use Mongoose to delete the quiz by ID
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = mongoose.model("quizzes", quizSchema);
