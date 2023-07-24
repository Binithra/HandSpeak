import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { Con, Con1, Con2, Con3, Con4, Con5 } from "../assets/img/index";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="block mb-2 text-left text-2xl font-semibold text-teal-700 pt-6 ...">
      අපි පොත් කියවමු!
      </div>

      <div className="flex items-center justify-between gap-8 px-8 py-6 ">
        <motion.img
          src={Con}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
        <motion.img
          src={Con1}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
        <motion.img
          src={Con5}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
        <motion.img
          src={Con3}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
        <motion.img
          src={Con4}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
        <motion.img
          src={Con3}
          alt="Logo"
          className="w-48 shadow-xl ..."
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="block mb-2 text-left text-2xl font-semibold text-teal-700 pt-6 ...">
      අපි පාඨමාලාවක් ආරම්භ කරමු!
      </div>
    </div>
    
  );
};

export default Home;
