import React from "react";
import Header from "./Header";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { h1 } from "../assets/video/index";
import Dashboard from "./Dashboard";

const Home = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center pb-8">
      {user?.user?.role === "Student" && (
        <div class="flex pt-6">
          <header className="bg-white  ">
            <Header />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2">
              <div className="flex-1 mb-2">
                <h1 className="text-left text-2xl font-semibold text-teal-700 pt-6">
                  Hi {user?.user?.name}👋!
                </h1>
                <h3 className="mb-2 text-left text-base text-red-400 pt-6">
                  අපි තවත් ඉගෙන ගැනීමට පටන් ගනිමු!😊
                </h3>
                <p className="mb-2 text-left text-sm text-slate-500 pt-6 pb-4">
                  "දැනුම යනු ලෝකය වෙනස් කිරීමට ඔබට භාවිතා කළ හැකි බලවත්ම
                  ආයුධයයි."
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
            <Map />
          </header>
        </div>
      )}
      {user?.user?.role === "Admin" && <Dashboard />}
    </div>
  );
};

const Map = () => {
  const map =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d179468.37433566214!2d80.98995952188125!3d6.299393290981487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1701280570533!5m2!1sen!2slk";
  return (
    <div className="container w-auto flex flex-col md:flex-row p-8 rounded-lg mb-4  border border-teal-500">
      <div className="flex-1 md:pr-8">
        <div className="mt-2">
          <h4 className="mb-2 text-xl font-semibold text-blue-600">
            ඔබට උපකාර අවශ්‍ය නම්:
          </h4>
          <h4 className="mb-2 text-teal-800 mt-8">ගුරුවරයාගේ නම:</h4>
          <p className="font-semibold text-gray-700">ඒ.බී.සී. පෙරේරා මහතා</p>
        </div>
        <div className="mt-8">
          <h4 className="mb-2 text-teal-800">දුරකථන අංකය</h4>
          <p className="font-semibold text-gray-700">077 7712 1111</p>
        </div>
        <div className="mt-8">
          <h4 className="mb-2 text-teal-800">ඊතැපැල් ලිපිනය</h4>
          <p className="font-semibold text-gray-700">abc@gmail.com</p>
        </div>
      </div>
      <div className="flex-none w-full md:w-1/2 mt-8">
        <div className="mt-8">
          <h4 className="mb-2 text-teal-800">ලිපිනය</h4>
          <p className="font-semibold text-gray-700">
            අංක 111/A, ප්‍රධාන වීදිය, මීගමුව.
          </p>
        </div>
        <iframe
          src={map}
          title="Location Map"
          className="h-80 md:h-auto w-full rounded-lg mt-8"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
