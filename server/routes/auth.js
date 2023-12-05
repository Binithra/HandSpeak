const router = require("express").Router();

const user = require("../models/user");

const admin = require("../config/firebase.config");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ auth: false, message: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "User is not verified" });
    }
    //checking user exist or not
    const userExist = await user.findOne({ user_id: decodeValue.uid });
    if (!userExist) {
      newUserData(decodeValue, req, res);
    } else {
      updateNewUserData(decodeValue, req, res);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post('/Signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Create user in your MongoDB
    const newUser = new user({
      user_id: userRecord.uid,
      // Add other user properties as needed
    });

    const savedUser = await newUser.save();

    // You can add additional logic here based on your requirements

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      user: savedUser,
    });
  } catch (error) {
    console.error('Error in user signup:', error);

    // Check the error code and handle accordingly
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name || "User",
    email: decodeValue.email,
    imageURL: decodeValue.picture || "https://i.pinimg.com/564x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg",
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "Student",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

router.get("/getUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const userExists = await user.findOne({ _id: filter });
  if (!userExists)
    return res.status(400).send({ success: false, msg: "Invalid User ID" });
  if (userExists.favourites) {
    res.status(200).send({ success: true, data: userExists });
  } else {
    res.status(200).send({ success: false, data: null });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "User Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "User Not Found" });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  console.log(req.body.data.role, req.params.userId);
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
});

router.get("/getUsers", async (req, res) => {
  const options = {
    sort: req.createdAt,
  };

  const cursor = await user.find(options);

  if (cursor) {
    return res.status(200).send({
      success: true,
      data: cursor,
    });
  } else {
    return res.status(400).send({
      success: false,
      message: "No data",
    });
  }
});

module.exports = router;
