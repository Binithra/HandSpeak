import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { w1 } from "../assets/video/index";
import { w2, w3, w4, w5, w6, w7 } from "../assets/img/index";
import SignUp from "./SignUp";

const last = (
  <div className="w-full h-auto flex flex-col items-center justify-center">
    <h2 className="text-center text-2xl font-semibold text-teal-700 pt-20 pb-8">
      Ready to dive deep?
    </h2>
    <button
      class="bg-amber-400 text-white font-bold py-2 px-4 rounded"
      onClick={SignUp}
    >
      Start Learning!
    </button>
  </div>
);

const middle = (
  <div className="text-left text-2xl pt-6">
    <h2 className="text-center text-2xl font-semibold text-teal-700 pt-12 pb-12">
      How HandSpeak powers you up?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card card-compact h-[22rem] w-96 bg-teal-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w2} alt="Fingerspelling Detection" />
          </figure>

          <h2 className="card-title text-center text-teal-700">
            Fingerspelling Detection
          </h2>
          <p className="text-justify">
            Practice signing the Sinhala alphabet using hands in front of the
            camera.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="card card-compact h-[22rem] w-96 bg-violet-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w3} alt="Fingerspelling Detection" />
          </figure>

          <h2 className="card-title text-center text-violet-700">
            Storybook Library
          </h2>
          <p className="text-justify">
            Sinhala storybooks, enriched with vibrant illustrations and quizzes
            that reinforce understanding of what you learnt.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="card card-compact h-[22rem] w-96 bg-rose-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w4} alt="Fingerspelling Detection" />
          </figure>
          <h2 className="card-title text-center text-rose-700">
            Educational Videos
          </h2>
          <p className="text-justify">
            A collection of videos of sign language interpretation covering
            various subjects.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="card card-compact h-[22rem] w-96 bg-amber-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w5} alt="Fingerspelling Detection" />
          </figure>

          <h2 className="card-title text-center text-amber-700">
            Interactive Quizzes
          </h2>
          <p className="text-justify">
            Provides your learning progress and achievements.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="card card-compact h-[22rem] w-96 bg-sky-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w6} alt="Fingerspelling Detection" />
          </figure>

          <h2 className="card-title text-center text-sky-700">
            Engaging Interface
          </h2>
          <p className="text-justify">
            A child-friendly interface with interactive elements, vibrant
            colors, and intuitive navigation for a delightful learning
            experience.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <div className="card card-compact h-[22rem] w-96 bg-orange-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w7} alt="Fingerspelling Detection" />
          </figure>
          <h2 className="card-title text-center text-orange-700">
            Accessibility Features
          </h2>
          <p className="text-justify">
            Ensures accessibility for all users, including clear visuals, color
            contrasts, and compatibility with assistive technologies.
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  </div>
);

const Welcome = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center pb-8">
      <Header />
      <div class="flex pt-6">
        <header className="bg-white shadow ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2">
            <div className="flex-1 mb-2  ">
              <h1 className="text-left text-2xl font-semibold text-teal-700 pt-6">
                Sinhala Learning Platform for Hearing-Impaired Children
              </h1>
              <h3 className="mb-2 text-left text-base text-red-400 pt-6">
                Let your hands speak!
              </h3>
              <p className="mb-2 text-left text-sm text-slate-500 pt-6 pb-4">
                Together with HandSpeak, hearing-impaired children can learn
                Sinhala with confidence and unlock boundless opportunities for
                communication.
              </p>
              <button class="bg-amber-400 text-white font-bold py-2 px-4 rounded">
                Start Learning!
              </button>
            </div>

            <div className="flex-none mb-2">
              <figure>
                <video
                  src={w1}
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
      {middle}
      {last}
    </div>
  );
};

export default Welcome;
