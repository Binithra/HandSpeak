import React from "react";
import Header from "./Header";
import { Con5, Con4, Con } from "../assets/img/index";
import { NavLink } from "react-router-dom";

const StoryBook = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-300">
      <Header />
      <div className="text-2xl font-semibold pt-8 pb-12">
        ඔබ කියවීමට කැමති පොතක් තෝරන්න.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 pl-12 gap-20">
        <Bookcover1 />
        <Bookcover2 />
        <Bookcover3 />
      </div>
    </div>
  );
};

export const Bookcover1 = () => {
  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con5}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - මම පොඩිද?</h2>
        <p className="text-white">කතෘ - පිලිප් පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">කියවන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const Bookcover2 = () => {
  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con4}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - සිංහල හෝඩි පොත</h2>
        <p className="text-white">කතෘ - පිලිප් පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">කියවන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const Bookcover3 = () => {
  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - තොප්පි වෙළෙන්දා</h2>
        <p className="text-white">කතෘ - සකුන්තලා පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">කියවන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default StoryBook;
