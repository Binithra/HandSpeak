import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, Progress, Quiz, QuizScreen, SignPractice, SignUp, Support, Videos, Welcome, VideoScreen, StoryBook, Dboard1, DashboardUsers} from "./components";
import { app } from "./config/firebase.config";

import { getAuth } from "firebase/auth";

import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            })
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        navigate("/Login");
      }
    });
  }, []);

  return (
    <AnimatePresence>
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/*" element={<Home />} />
          <Route path='/Videos' element={<Videos/>} />
          <Route path='/Progress' element={<Progress/>} />
          <Route path='/SignPractice' element={<SignPractice/>} />
          <Route path='/Support' element={<Support/>} />
          <Route path='/Quiz' element={<Quiz/>} />
          <Route path="/Dashboard/*" element={<Dashboard/>} />
          <Route path='/QuizScreen' element={<QuizScreen/>} />
          <Route path='/Welcome' element={<Welcome/>} />
          <Route path='/VideoScreen' element={<VideoScreen/>} />
          <Route path='/StoryBook' element={<StoryBook/>} />
          <Route path='/Dboard1' element={<Dboard1/>} />
          <Route path='/DashboardUsers' element={<DashboardUsers/>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
