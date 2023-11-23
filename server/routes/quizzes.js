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
      question:req.body.question,
      option1: req.body.option1,
      option2:req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer:req.body.answer,
      title:req.body.title,
      imageURL:req.body.imageURL,
      mcq:true,
      // user:req.user.id,
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
    if (!result) {
      return res
        .status(200)
        .send({ success: true, msg: "Data Deleted successfully", data: result });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  });

  // router.put("/update/:id", async (req, res) => {
  //   const filter = { _id: req.params.id };
  
  //   const options = {
  //     upsert: true, //upsert is used in case if the data isnt available it'll create new one.
  //     new: true,
  //   };
  
  //   try {
  //     const result = await quiz.findOneAndUpdate(
  //       filter,
  //       {
  //         title:req.body.title,
  //         questions: req.body.questions,
  //         scores:req.body.scores,
  //         createdAt: req.body.createdAt,
  //         deleted: req.body.deleted,
  //       },
  //       options
  //     );
  
  //     return res.status(200).send({ success: true, data: result });
  //   } catch (error) {
  //     return res.status(400).send({ success: false, msg: error });
  //   }
  // });

  module.exports = router;