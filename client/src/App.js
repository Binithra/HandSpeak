import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Home,
  Login,
  Progress,
  Quiz,
  QuizScreen,
  SignPractice,
  SignUp,
  Support,
  Videos,
  Welcome,
  VideoScreen,
  StoryBook,
  DashboardHome,
  DashboardUser,
  DashboardStorybook,
  DashboardVideo,
  DashboardUserCard,
  VideoPlayer,
  DashboardQuiz,
  QuizViewer,
  BookViewer,
} from "./components";
import { app } from "./config/firebase.config";

import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";

import { AnimatePresence, motion } from "framer-motion";
import { validateUser, getAllStorybooks, getAllVideos } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [
    {
      user,
      isVideoPlaying,
      allBooks,
      allVideos,
      allquiz,
      getAllQuiz,
      isBookViewing,
    },
    dispatch,
  ] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allBooks && user) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allBooks: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!allVideos && user) {
      getAllVideos().then((data) => {
        dispatch({
          type: actionType.SET_ALL_VIDEOS,
          allVideos: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!allquiz && user) {
      getAllQuiz().then((data) => {
        dispatch({
          type: actionType.SET_ALL_QUIZ,
          allquiz: data.quiz,
        });
      });
    }
  }, []);

  return (
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm "></div>
          ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/*" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/SignPractice" element={<SignPractice />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/QuizScreen" element={<QuizScreen />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/VideoScreen" element={<VideoScreen />} />
          <Route path="/StoryBook" element={<StoryBook />} />
          <Route path="/DashboardHome" element={<DashboardHome />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/DashboardVideo" element={<DashboardVideo />} />
          <Route path="/DashboardStorybook" element={<DashboardStorybook />} />
          <Route path="/DashboardQuiz" element={<DashboardQuiz />} />
          <Route path="/DashboardUserCard" element={<DashboardUserCard />} />
          <Route path="/QuizViewer" element={<QuizViewer />} />
          <Route path="/BookViewer" element={<BookViewer />} />
        </Routes>

        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <VideoPlayer />
          </motion.div>
        )}

        {isBookViewing && (
          <div
            className={`fixed min-w-[700px] h-3/4 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <BookViewer />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
