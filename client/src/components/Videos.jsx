import React, { useEffect, useState } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { q1, q2, q3, q4, q5, q6, q7, q8 } from "../assets/video/index";
import { useStateValue } from "../context/StateProvider";
import {actionType} from '../context/reducer'
import { getAllVideos } from "../api";
import VideoScreen from "./VideoScreen";

const Videos = () => {
  const [showVideoScreen, setShowVideoScreen] = useState(false);
  const [id, setId] = useState("");
  const[{allVideos},dispatch] = useStateValue()

  const openVideoScreen = (id) => {
    setShowVideoScreen(true);
    setId(id);
  };
  console.log( "------- >" ,id,showVideoScreen );

  const closeVideoScreen = () => {
    setShowVideoScreen(false);
  }

  useEffect(()=>{
    setId("");
    if(!allVideos){
      getAllVideos().then((data)=>{
        console.log(data.videos);
        dispatch({
          type:actionType.SET_ALL_VIDEOS,
          allVideos:data.videos,
        })
      })
    }

  },[])

  

  return (
    <div className="w-full h-auto flex flex-col  bg-yellow-100">
      <Header />
      {showVideoScreen ? (
            <VideoScreen cato={id} closeVideoScreen={closeVideoScreen} />
          ) : (
      <>
      <div className="text-2xl font-semibold p-4 text-center justify-center">ඔබ සඳහා වීඩියෝ පාඩම්</div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ml-12">
        <VideoCard id="Letters" video={q2} title={'අකුරු'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen} />
        <VideoCard id="Colors" video={q8} title={'පාට'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="Number" video={q5} title={'අංක'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="People" video={q1} title={'මිනිසුන්'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="Fruits" video={q3} title={'පළතුරු'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="Places" video={q7} title={'ස්ථාන'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="Greetings" video={q4} title={'සුභ පැතුම්'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
        <VideoCard id="DailyUsage"  video={q6} title={'දෛනික භාවිත'} screen={"/VideoScreen"} openVideoScreen={openVideoScreen}/>
      </div>
      </>
       )}

    </div>
  );
};

export const VideoCard  = ({id , video , title, screen, openVideoScreen }) => {
  return (
    <div className="card card-compact w-60 bg-yellow-500 shadow-xl hover:shadow-orange-200 ">
      <figure>
        <video
          src={video}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-60 object-cover hover:scale-110 ease-in duration-150"
        ></video>
      </figure>
      <div className="flex flex-col card-body">
      <h2 className="card-title">{title}</h2>
    
        <div className="flex flex-col p-4">
       
            <button className="btn btn-primary" onClick={() => openVideoScreen(id)} >බලන්න</button>
        </div>
        </div>
    </div>
  );
};

export default Videos;
