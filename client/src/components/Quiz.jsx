import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";

const Quiz = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-teal-100">
      <Header />
      <div className="text-2xl font-semibold p-8">
        ප්‍රශ්නාවලි සම්පූර්ණ කරමු
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 m-10 mb-54 ">
        <QuizCard title={"ප්‍රශ්නාවලි 01"} screen={"/QuizScreen"} />
        <QuizCard title={"ප්‍රශ්නාවලි 02"} screen={"/QuizScreen2"} />
        <QuizCard title={"ප්‍රශ්නාවලි 01"} screen={"/QuizScreen"} />
        <QuizCard title={"ප්‍රශ්නාවලි 02"} screen={"/QuizScreen2"} />
      </div>
    </div>
  );
};

export const QuizCard = ({ video, title, screen }) => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
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
