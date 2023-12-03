import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { getAllVideos } from "../api";
import { actionType } from "../context/reducer";
import { CardDisplay } from "./CardDisplay";

export const DashboardVideo = () => {
  const [videoFilter, setVideoFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allVideos }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allVideos) {
      getAllVideos().then((data) => {
        console.log(data.videos);
        dispatch({
          type: actionType.SET_ALL_VIDEOS,
          allVideos: data.videos,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newVideo"}
          className="flex items-center px-4 py-3 font-semibold border-2 rounded-md border-orange-500 hover:shadow-md cursor-pointer gap-4"
        >
          Add New Video
          <IoAdd />
        </NavLink>
      </div>
      {/* Main Container */}
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        {/* The count */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-black">Count : </span>
            {allVideos?.length}
          </p>
        </div>
        <VideoContainer data={allVideos} />
      </div>
    </div>
  );
};

// internal component creating
export const VideoContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((video, i) => (
          <CardDisplay key={video._id} data={video} index={i} type="video" />
        ))}
    </div>
  );
};

export default DashboardVideo;
