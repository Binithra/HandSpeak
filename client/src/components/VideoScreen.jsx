import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCatoVideos } from "../api";
import { useStateValue } from "../context/StateProvider";
import {actionType} from '../context/reducer'
import ReactVideoPlayer from "./ReactVideoPlayer";

const VideoScreen = ({cato, closeVideoScreen}) => {

  const[{videoCato},dispatch] = useStateValue()
  const [videos, setVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState([]);

  const showModal = (video) => {
    setShowVideoModal(true);
    setVideoToPlay(video);
    console.log("video",video);

  }

  const closeModal = () => {
    setShowVideoModal(false);
  }


  useEffect(()=>{
    if(!videoCato){
      getCatoVideos(cato).then((data)=>{
        console.log( "*/*/*/*/*//*/*",data.videos);
        setVideos([...data.videos])
        dispatch({
          type:actionType.SET_VIDEO_CATO,
          videoCato:data.videos,
        })
      })
    }

  },[])
  console.log("--------######---------->",videos);

  console.log(cato);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/Videos"}>
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={() => closeVideoScreen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Back
            </a>
          </NavLink>
        </div>
        <div className="flex-1">
          <h6 className="title font-bold">{cato}</h6>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {showVideoModal && <ReactVideoPlayer videos={videoToPlay} index={0} closeModal={closeModal}/>}

      <div className="pt-8 flex flex-wrap gap-4 grid-cols-4">
        {videos &&
          videos?.map((videos, i) => {
            return <VideoCard videos={videos} index={i} openVideo={showModal}/>;
          })}
      </div>
    </div>
  );
};

export default VideoScreen;

export const VideoCard = ({videos , index , openVideo}) => {
  
  return (
    <div className="card w-72 border-2 bg-base-100 shadow-xl hover:shadow-slate-300 cursor-pointer" onClick={() => openVideo(videos)}>
      <figure>
        <img
          src={videos?.imageURL}
          alt="tumbnains"
          className="w-full h-48 object-cover rounded-t-md hover:scale-110 ease-in duration-150"
        />
      </figure>
      <div className="card-body">
        <h2 className='font-semibold'>
          {videos?.name} <br/>
          <div className="badge badge-secondary">{videos?.level}</div>
        </h2>
        <p>Created At - {videos?.createdAt}</p>
      </div>
    </div>
  );
};

