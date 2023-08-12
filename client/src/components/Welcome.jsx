import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2 divide-x">
          <div className="flex w-full ">
            <div className="block mb-2 text-left text-2xl font-semibold text-teal-700 pt-6 ">
              <h1>Sinhala Learning Platform for Hearing-Impaired Children</h1>
              <h3 className="mb-2 text-left text-base text-red-400 pt-6">
                Let your hands speak!
              </h3>
              <p className="mb-2 text-left text-sm text-slate-500 pt-6">
                Together with HandSpeak, hearing-impaired children can learn
                Sinhala with confidence and unlock boundless opportunities for
                communication.
              </p>
              <button class="bg-amber-400 text-white font-bold py-2 px-4 rounded">
                Start Learning!
              </button>
            </div>
            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
              <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"></div>

                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                  content
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
