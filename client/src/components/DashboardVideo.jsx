import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { getAllVideos } from "../api";
import {actionType} from '../context/reducer'
import {VideoDisplay} from '../components/VideoDisplay'

const DashboardVideo=()=> {
  const [videoFilter, setVideoFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const[{allVideos},dispatch] = useStateValue()

  useEffect(()=>{
    if(!allVideos){
      getAllVideos().then((data)=>{
        console.log(data.video);
        dispatch({
          type:actionType.SET_ALL_VIDEOS,
          allVideos:data.video,
        })
      })
    }


  },[])
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newVideo"}
          className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={videoFilter}
          onChange={(e) => setVideoFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer"/>
        </i>
      </div>
          {/* Main Container */}
          <div className="relative w-full my-4 p-4 border border-gray-300 rounded-md">
            {/* The count */}
            <div className="absolute top-4 left-4">
              <p className="text-xl font-bold"><span className="text-sm font-semibold text-black">Count : </span>
              {allVideos?.length}
              </p></div>
              <VideoContainer data={allVideos} /></div>

    </div>
  );
        }

  // internal component creating
  export const VideoContainer =({data})=>{
    return(
      <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
        {data && data.map((video,i)=>(
          <VideoDisplay key={video._id} data={video} index={i}/>
        ))}
      </div>
    )
  
    
  }

export default DashboardVideo;

