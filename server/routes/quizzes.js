const router = require("express").Router();

const quiz = require("../models/quiz");

router.get("/getAll", async (req, res) => {
  // return res.json("getting all");
  const options = {
    sort: req.createdAt,
  };

  const data = await quiz.find(options);
  if (data) {
    return res.status(200).send({ success: true, quiz: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
  
  router.post("/save", async (req, res) => {
    const newQuiz = quiz({
      questions: req.body.questions,
      category: req.body.category,
      imgUrl: req.body.imgUrl,
      scores:req.body.scores,
      createdAt: req.body.createdAt,
      deleted: req.body.deleted,
    });
  
    try {
      const savedQuiz = await newQuiz.save();
      return res.status(200).send({ success: true, quiz: savedQuiz });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });

  router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const data = await quiz.findOne(filter);
  
    if (data) {
      return res.status(200).send({ success: true, quiz: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const result = await quiz.deleteOne(filter);
    if (result) {
      return res
        .status(200)
        .send({ success: true, msg: "Data Deleted successfully", data: result });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  });

  router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const options = {
      upsert: true, //upsert is used in case if the data isnt available it'll create new one.
      new: true,
    };
  
    try {
      const result = await quiz.findOneAndUpdate(
        filter,
        {
          questions: req.body.questions,
          category: req.body.category,
          imgUrl: req.body.imgUrl,
          scores:req.body.scores,
          createdAt: req.body.createdAt,
          deleted: req.body.deleted,
        },
        options
      );
  
      return res.status(200).send({ success: true, data: result });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });

  module.exports = router;