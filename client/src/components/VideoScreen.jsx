import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCatoVideos } from "../api";
import { useStateValue } from "../context/StateProvider";
import {actionType} from '../context/reducer'

const VideoScreen = ({cato, closeVideoScreen}) => {

  const[{videoCato},dispatch] = useStateValue()
  const [videos, setVideos] = useState([]);


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

      <div className="pt-8 ">
        {videos?.length}</div>
        {
          videos &&(
          videos?.map((videos ,i)=>{

            return(
              <VideoCard videos={videos} index={i}  />
            )
          }))
        }


    </div>
  );
};
//Map issue in render ing the cards

export default VideoScreen;

export const VideoCard = ({videos , index}) => {

  const[{isVideoPlaying, videoIndex},dispatch] = useStateValue()


  const addToContext=()=>{
    if(!isVideoPlaying){
      dispatch({
        type: actionType.SET_ISVIDEO_PLAYING,
        isVideoPlaying: true,
      });
    }
    if(videoIndex !== index){
      dispatch({
        type: actionType.SET_VIDEO_INDEX,
        videoIndex: index,
      });
    }

  }

  //https://www.npmjs.com/package/react-player
  // Remove the Contect and add new player

  return (
    <div className="card  w-96 bg-base-100 shadow-xl" onClick={addToContext}>
      <figure>
        <img
          src={videos?.imageURL}
          alt="tumbnains"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {videos?.name}
          <div className="badge badge-secondary">{videos?.level}</div>
        </h2>
        <p>Created At - {videos?.createdAt}</p>
        
      </div>
    </div>
  );
};
