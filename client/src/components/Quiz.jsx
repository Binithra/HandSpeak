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
        <QuizCard1 />
        <QuizCard2 />
        <QuizCard3 />
        <QuizCard4 />
        <QuizCard5 />
        <QuizCard6 />
        <QuizCard7 />
        <QuizCard8 />
      </div>
    </div>
  );
};

export const QuizCard1 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q2}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">අකුරු</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const QuizCard2 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q5}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">අංක</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export const QuizCard3 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q1}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">මිනිසුන්</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export const QuizCard4 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q3}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">පළතුරු</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export const QuizCard5 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q7}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">ස්ථාන</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export const QuizCard6 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q4}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">සුභ පැතුම්</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export const QuizCard7 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q6}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">දෛනික භාවිත</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const QuizCard8 = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <figure>
        <video
          src={q8}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">පාට</h2>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen"}>
            <button className="btn btn-primary">ඉගෙනගමු</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
