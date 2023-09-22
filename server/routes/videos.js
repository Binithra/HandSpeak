const router = require("express").Router();

//video model
const video = require("../models/video");

router.post("/save", async (req, res) => {
  const newVideo = video({
    name: req.body.name,
    imageURL: req.body.imageURL,
    videoURL: req.body.videoURL,
    level:req.body.level,
    category: req.body.category,
  });

  try {
    const savedVideo = await newVideo.save();
    return res.status(200).send({ success: true, video: savedVideo });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await video.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, video: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.get("/getAll", async (req, res) => {
  // return res.json("getting all");
  const options = {
    sort: req.createdAt,
  };

  const data = await video.find(options);
  if (data) {
    return res.status(200).send({ success: true, videos: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.get("/getCato/:cato", async (req, res) => {
  // return res.json("getting all");
  const options = {
    category: req.params.cato,
  };

  const data = await video.find(options);
  if (data) {
    return res.status(200).send({ success: true, videos: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await video.deleteOne(filter);
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
    const result = await video.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        videoURL: req.body.videoURL,
        level:req.body.level,
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
