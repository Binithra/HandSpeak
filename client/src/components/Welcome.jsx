import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { w1 } from "../assets/video/index";
import { w2, w3, w4, w5, w6, w7 } from "../assets/img/index";

const middle = (
  <div className="text-left text-2xl pt-6">
    <h2 className="text-center text-2xl font-semibold text-white h-5 w-auto p-4 rounded-lg mb-4 pb-12 bg-teal-600">
      HandSpeak ඔබව ශක්තිමත් කරන්නේ කෙසේද?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card card-compact h-[22rem] w-96 bg-teal-100 shadow-xl">
        <div className="card-body">
          <figure className=" h-[12rem]">
            <img src={w2} alt="Fingerspelling Detection" />
          </figure>

          <h2 className="card-title text-center text-teal-700">
          ඇඟිලි සලකුණු හඳුනාගැනීම
          </h2>
          <p className="text-justify">
            කැමරාව ඉදිරිපිට අත් භාවිතා කරමින් සිංහල හෝඩියේ සංඥා භාෂාව පුහුණු
            වන්න.
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
          කතන්දර පොත් පුස්තකාලය
          </h2>
          <p className="text-justify">
            ඔබ ඉගෙන ගත් දේ පිළිබඳ අවබෝධය ශක්තිමත් කරන විචිත්‍රවත් නිදර්ශන සහ
            ප්‍රශ්නාවලියෙන් පොහොසත් සිංහල කතන්දර පොත්.
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
          අධ්‍යාපනික වීඩියෝ          </h2>
          <p className="text-justify">
            විවිධ විෂයයන් ආවරණය වන සංඥා භාෂා පරිවර්ථනයේ වීඩියෝ එකතුවකි.
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
          ඉගෙනුම් ප්‍රශ්නාවලිය
          </h2>
          <p className="text-justify">
            ඔබේ ඉගෙනීමේ ප්‍රගතිය සහ ජයග්‍රහණ සපයයි.
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
          ආකර්ශනීය අතුරු මුහුණත්
          </h2>
          <p className="text-justify">
            රසවත් ඉගෙනුම් අත්දැකීමක් සඳහා අන්තර්ක්‍රියාකාරී විශේෂාංග,
            විචිත්‍රවත් වර්ණ සහ බුද්ධිමය සංචාලනය සහිත ළමා හිතකාමී අතුරුමුහුණත්
            ඇතුළත් වේ.
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
          විශේෂ ලක්ෂණ
          </h2>
          <p className="text-justify">
          පැහැදිලි දර්ශන, වර්ණ පරස්පරතා සහ සහායක තාක්ෂණයන් සමඟ ගැළපුම ඇතුළුව සියලුම පරිශීලකයින් සඳහා ප්‍රවේශ්‍යතාව සහතික කරයි.
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-4 grid grid-cols-2">
          <div className="flex-1 ml-8">
            <h1 className="text-left text-2xl font-semibold text-teal-700 pt-6">
              ශ්‍රවණාබාධිත ළමුන් සඳහා සිංහල ඉගෙනුම් වේදිකාව
            </h1>
            <h3 className="mb-2 text-left text-base font-medium text-red-400 pt-8">
              ඔබේ අත්වලට කතා කිරීමට ඉඩ දෙන්න!
            </h3>
            <p className="mb-2 text-base font-semibold text-slate-500 pt-6">
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
      </div>
      {middle}
    </div>
  );
};

export default Welcome;
