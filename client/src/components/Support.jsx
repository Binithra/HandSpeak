import React from "react";
import Header from "./Header";
import SupportCard from "./SupportCard";
import { NavLink } from "react-router-dom";
import { S1, S2, S3 } from "../assets/img/index";

const Support = () => {
  return (
    <div className="w-full h-screen items-center justify-center bg-slate-800">
      <Header />
      <h2 className="text-center text-2xl font-semibold text-green-600 pt-12 pb-4">
        සහාය සදහා
      </h2>
      <div className="w-full h-auto flex flex-col items-center justify-center">
        {
          <NavLink to={"/Welcome"}>
            <SupportCard
              image={S1}
              content="HandSpeak යනු?"
              description="HandSpeak පිලිබඳ දැන ගන්න"
            />
            <SupportCard
              image={S2}
              content="පොදු ගැටළු"
              description="නිතර අසන ප්‍රශ්න සහ පිළිතුරු"
            />
            <SupportCard
              image={S3}
              content="ගුරුවරයෙකු අමතන්න"
              description="ගුරුවරයෙකුගෙන් උපකාර ලබාගන්න"
            />
          </NavLink>
        }
      </div>
    </div>
  );
};

export default Support;
