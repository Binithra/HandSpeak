import React, { useEffect, useState} from "react";

import { app, auth } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../context/StateProvider"; 
import { actionType } from "../context/reducer";
import { validateUser } from "../api";

import {LoginBg} from "../assets/video/index";

const Login = ({ setAuth }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if(email !== null && password !== null) {
        signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(() => {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {

            userCred.getIdToken().then((token) => {
              validateUser(token).then((data)=> {
                dispatch({
                  type:actionType.SET_USER,
                  user:data,
                })
              })
            });

            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type:actionType.SET_USER,
              user:null,
            })
            navigate("/login");
          }
        });
            
        })
        .catch((err) => alert(err));
    }
}

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [{user},dispatch] = useStateValue()

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {

            userCred.getIdToken().then((token) => {
              validateUser(token).then((data)=> {
                dispatch({
                  type:actionType.SET_USER,
                  user:data,
                })
              })
            });

            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type:actionType.SET_USER,
              user:null,
            })
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth" === "true")) {
      navigate("/", { replace: true });
    }
  });

  return (
    
   <div className="relative w-screen h-screen">
      <video src={LoginBg}
      type = "video/mp4"
      autoPlay
      muted
      loop
      className="w-full h-full object-cover"

      ></video>
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4 ">
        <div className="w-full md:w-375 p-4 gap-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
        <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl px-8 p-5">
                
                <label for="email" className="block mb-2 text-2xl font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Login</label>


                    
                        <div className="mb-5">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input type="email" name="email" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                            <input type="password" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" 
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                            
                            />
                        </div>
                        <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow" onClick={handleLogin}>Login</button>
                    
                
                <div className="flex flex-col justify-center items-center p-4 gap-2 text-base border-t border-gray-300 bg-white">
                  <hr/>
                    
                    
                </div>
            </div>
            
          </div>
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;

