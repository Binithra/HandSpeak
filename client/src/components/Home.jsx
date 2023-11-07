import React from "react";
import Header from "./Header";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { h1 } from "../assets/video/index";
import Dashboard from "./Dashboard";

const middle = (
  <div className="text-left text-2xl pt-6 pb-8">
    <h2 className="text-center text-2xl font-semibold text-teal-700 pt-12 pb-12">
      Let's Complete!
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card card-compact h-[8rem] w-96 bg-orange-100 shadow-xl pb-8">
        <div className="card-body">
          <h2 className="card-title text-center text-orange-700">Quiz</h2>
          <p className="text-justify">Family</p>
          <div className="card-actions justify-end"></div>
        </div>
        <button class="bg-teal-500 text-white font-bold py-2 px-4 rounded">
          Continue
        </button>
      </div>

      <div className="card card-compact h-[8rem] w-96 bg-violet-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-violet-700">Storybook</h2>
          <p className="text-justify">Humpty Dumpty</p>
          <div className="card-actions justify-end"></div>
        </div>
        <button class="bg-teal-500 text-white font-bold py-2 px-4 rounded">
          Continue
        </button>
      </div>

      <div className="card card-compact h-[8rem] w-96 bg-rose-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-rose-700">Quiz</h2>
          <p className="text-justify">Letters</p>
          <div className="card-actions justify-end"></div>
        </div>
        <button class="bg-teal-500 text-white font-bold py-2 px-4 rounded">
          Continue
        </button>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center pb-8">
      
      {user?.user?.role === "Student" && (
      <div class="flex pt-6">
        <Header />
        <header className="bg-white shadow ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2">
            <div className="flex-1 mb-2">
              <h1 className="text-left text-2xl font-semibold text-teal-700 pt-6">
                Hi {user?.user?.name}!
              </h1>
              <h3 className="mb-2 text-left text-base text-red-400 pt-6">
                Let's continue to achieve more!
              </h3>
              <p className="mb-2 text-left text-sm text-slate-500 pt-6 pb-4">
                "දැනුම යනු ලෝකය වෙනස් කිරීමට ඔබට භාවිතා කළ හැකි බලවත්ම ආයුධයයි."
              </p>
            </div>
            <div className="flex-none mb-2 ">
              <figure className=" h-[12rem]">
                <video
                  src={h1}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
                  className="float-right h-32 md:h-48 lg:h-64"
                ></video>
              </figure>
            </div>
          </div>
        </header>
      </div>
      )} 
      {user?.user?.role === "Admin" && (
          <Dashboard />
      )}
      {middle}
      
    </div>
  );
};

export default Home;
