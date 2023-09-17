import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { DashboardVideo } from "./DashboardVideo";

const VideoPlayer = () => {
  const [{ videoIndex, allVideos, isVideoPlaying }, dispatch] = useStateValue();
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);

  return (
    <div className="w-full flex gap-3 overflow-hidden relative">
      <div className="w-1/2">
        <Video
         src={allVideos[videoIndex]?.videoURL}
          autoPlay
          loop
          muted
          controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
          poster={allVideos[videoIndex]?.imageURL}
          onCanPlayThrough={() => {
            // Do stuff
          }}
          className="w-full h-auto"
        >
          <track
            label="English"
            kind="subtitles"
            srcLang="en"
            src="http://source.vtt"
            default
          />
        </Video>
      </div>

      {isPlaylistVisible && (
        <div className="w-1/2 p-4 flex flex-col justify-center">
          <div className="text-xl text-teal-700 font-semibold ">
            Video Name : 
            {` ${allVideos[videoIndex]?.name.substring(0, 20)}${
              allVideos[videoIndex]?.name.length > 20 ? "..." : ""
            }`}
          </div>
          <div className="flex items-center gap-4 pt-2 text-black my-1">
            <span className="text-lg font-semibold">
                Category :&nbsp;
              {allVideos[videoIndex]?.category}
            </span></div>
            <div className="flex items-center gap-4 pt-2 text-textColor my-1">
            <span className="text-lg text-black font-semibold">
                Level :&nbsp;
              {allVideos[videoIndex]?.level}
            </span>
           

            <div className="absolute top-2 right-2">
              <NavLink
                onClick={"/dashboard/videos"}
                className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
              >
                <FaTimes />
              </NavLink>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
