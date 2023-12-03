import React, { useEffect, useState } from "react";
import { Logo } from "../assets/img/index";
import { Link } from "react-router-dom";
import { app, database } from "../config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";
import { LoginBg } from "../assets/video/index";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  // const [dispatch] = useState();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            // Redirect to the home page for both Google and email/password login
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        if (email !== null && password !== null) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");

          firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
              userCred.getIdToken().then((token) => {
                validateUser(token).then((data) => {
                  dispatch({
                    type: actionType.SET_USER,
                    user: data,
                  });
                });
              });

              navigate("/", { replace: true });
            } else {
              setAuth(false);
              dispatch({
                type: actionType.SET_USER,
                user: null,
              });
              navigate("/login");
            }
          });
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth" === "true")) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div className="relative w-screen h-screen ">
      <header className="flex items-center justify-center w-full h-16 bg-white">
        <img src={Logo} alt="Logo" className=" absolute left-0 top-0 w-16 " />
        <label
          for="text"
          className="block mb-2 font-arial text-2xl font-large text-black font-medium tracking-wide"
        >
          Sinhala Learning Platform for Hearing-Impaired Children
        </label>
      </header>
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center p-4 ">
        <div className="w-full md:w-375 p-4 gap-4 bg-lightOverlay shadow-xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div className="rounded-lg  bg-slate-100/50 ... overflow-hidden shadow-2xl px-8 p-5">
            <label
              for="create account"
              className="block mb-2 text-center text-2xl font-semibold text-teal-700"
            >
              Login
            </label>

            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-rose-500"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-rose-500"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                className="mb-2 text-center text-xs underline text-gray-500 hover:text-pink-700"
                to="/Signup"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              className="w-full p-3 mt-2  bg-teal-500 text-sky-200 rounded shadow  hover:bg-teal-800 hover:shadow-md"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="mb-5">
              <label
                for="or"
                className="block mb-2 text-center text-sm font-medium text-rose-500"
              >
                <br />
                OR
              </label>
            </div>

            <div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
              onClick={loginWithGoogle}
            >
              <FcGoogle className="text-xl" />
              Log in with Google
            </div>
            <br />
            <Link
              className="mb-2 text-center underline text-teal-700 hover:text-black"
              to="/Signup"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
