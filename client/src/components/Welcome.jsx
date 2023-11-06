import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { w1 } from "../assets/video/index";
import { w2, w3, w4, w5, w6, w7 } from "../assets/img/index";
import SignUp from "./SignUp";

const middle = (
  <div className="text-left text-2xl pt-6">
    <h2 className="text-center text-2xl font-semibold text-teal-700 pt-12 pb-12">
    HandSpeak ඔබව ශක්තිමත් කරන්නේ කෙසේද?
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
    <div className="w-full flex flex-col items-center pb-2">
      <Header />
      <div class="flex pt-1">
        <header className="bg-white shadow h-64">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2">
            <div className="flex-1 mb-2  ">
              <h1 className="text-left text-2xl font-semibold text-teal-700 pt-6">
              ශ්‍රවණාබාධිත ළමුන් සඳහා සිංහල ඉගෙනුම් වේදිකාව
              </h1>
              <h3 className="mb-2 text-left text-base text-red-400 pt-2">
              ඔබේ අත්වලට කතා කිරීමට ඉඩ දෙන්න!
              </h3>
              <p className="mb-2 text-sm text-slate-500 pt-6 pb-4">
                HandSpeak සමඟ එක්ව, ශ්‍රවණාබාධිත දරුවන්ට විශ්වාසයෙන් යුතුව සිංහල
                ඉගෙන ගත හැකි අතර සන්නිවේදනය සඳහා අසීමිත අවස්ථා විවෘත කළ හැකිය.
              </p>
            </div>

            <div className="flex-none mb-2">
              <figure>
                <video
                  src={w1}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
                  className="float-right h-72 "
                ></video>
              </figure>
            </div>
          </div>
        </header>
      </div>
      {middle}
    </div>
  );
};

export default Welcome;
