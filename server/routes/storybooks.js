const router = require("express").Router();

//storybooks model
const storybooks = require("../models/storybooks");

router.post("/save", async (req, res) => {
  const newstorybooks = storybooks({
    name: req.body.name,
    imageURL: req.body.imageURL,
    bookURL: req.body.bookURL,
    category: req.body.category,
  });

  try {
    const savedstorybooks = await newstorybooks.save();
    return res.status(200).send({ success: true, storybooks: savedstorybooks });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await storybooks.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, storybooks: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.get("/getAll", async (req, res) => {
  // return res.json("getting all");
  const options = {
    sort: req.createdAt,
  };

  const data = await storybooks.find(options);
  if (data) {
    return res.status(200).send({ success: true, storybooks: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await storybooks.deleteOne(filter);
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
    const result = await storybooks.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        bookURL: req.body.bookURL,
        category: req.body.category,
      },
      options
    );

    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});
module.exports = router;
