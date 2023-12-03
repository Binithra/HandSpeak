const express = require("express");
const app = express();
require("dotenv/config");
const signupRoute = require('./routes/auth');

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', signupRoute);

// app.get("/", (req, res) => {
//   return res.json("hii");
// });

//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//video route
const videosRoutes = require("./routes/videos");
app.use("/api/videos/", videosRoutes);

//storybooks route
const storybooksRoutes = require("./routes/storybooks");
app.use("/api/storybooks/", storybooksRoutes);

//quiz route
const quizRoutes = require("./routes/quizzes");
app.use("/api/quiz/", quizRoutes);

const emailRoutes = require("./routes/emails");
app.use("/api/email/", emailRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`ERROR :${error}`);
  });

app.listen(4000, () => console.log("Listening to port 4000"));
