import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { q1, q2, q3, q4, q5, q6, q7, q8 } from "../assets/video/index";

const Quiz = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-teal-100">
      <Header />
      <div className="text-2xl font-semibold p-4 ">
        Select a section to start practice
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuizCard video={q2} title={"අකුරු"} screen={"/QuizScreen"}/>
        <QuizCard video={q5} title={"අංක"} screen={"/QuizScreen2"}/>
        <QuizCard video={q1} title={"මිනිසුන්"} screen={"/QuizScreen2"} />
        <QuizCard video={q3} title={"පළතුරු"} screen={"/QuizScreen2"} />
        <QuizCard video={q7} title={"ස්ථාන"} screen={"/QuizScreen2"}/>
        <QuizCard video={q4} title={"සුභ පැතුම්"} screen={"/QuizScreen2"} />
        <QuizCard video={q6} title={"දෛනික භාවිත"} screen={"/QuizScreen2"} />
        <QuizCard video={q8} title={"පාට"} screen={"/QuizScreen2"} />
      </div>
    </div>
  );
};

export const QuizCard = ({video , title, screen}) => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={video}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <NavLink to={screen}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
