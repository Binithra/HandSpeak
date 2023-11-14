import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

const VideoPlayer = () => {
  
  const [{ videoIndex, allVideos, isVideoPlaying }, dispatch] = useStateValue();
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);
 
  const closeVideoPlayer = () => {
    if (isVideoPlaying) {
      dispatch({
        type: actionType.SET_ISVIDEO_PLAYING,
        isVideoPlaying: false,
      });
    }
  };

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
          className="w-640px h-360px"
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
            <motion.i whileTap={{ scale: 0.8 }} onClick={closeVideoPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;