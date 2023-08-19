import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { q1, q2, q3, q4, q5, q6, q7, q8 } from "../assets/video/index";

const Videos = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-yellow-100">
      <Header />
      <div className="text-2xl font-semibold p-4 ">Video Lessons for you</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <VideoCard  video={q2} title={'අකුරු'} screen={"/VideoScreen"}/>
        <VideoCard video={q5} title={'අංක'} screen={"/VideoScreen1"}/>
        <VideoCard video={q1} title={'මිනිසුන්'} screen={"/VideoScreen1"}/>
        <VideoCard video={q3} title={'පළතුරු'} screen={"/VideoScreen1"}/>
        <VideoCard video={q7} title={'ස්ථාන'} screen={"/VideoScreen1"}/>
        <VideoCard video={q4} title={'සුභ පැතුම්'} screen={"/VideoScreen1"}/>
        <VideoCard video={q6} title={'දෛනික භාවිත'} screen={"/VideoScreen1"}/>
        <VideoCard video={q8} title={'පාට'} screen={"/VideoScreen1"}/>
      </div>
    </div>
  );
};

export const VideoCard  = ({video , title, screen }) => {
  return (
    <div className="card card-compact w-80 bg-yellow-500 shadow-xl">
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
            <button className="btn btn-primary">බලන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Videos;
