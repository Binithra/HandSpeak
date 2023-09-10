import React, { useEffect, useState } from 'react'
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
  } from "firebase/storage";
  import { motion } from "framer-motion";
  
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import {
    getAllVideos,
    saveNewVideo,
} from "../api";
import { actionType } from "../context/reducer";
import { levelFilter, filters } from "../utils/supportfunctions";
import { IoMusicalNote } from "react-icons/io5";
import FilterButtons from './FilterButtons';
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewVideo = () => {
    const [videoName, setVideoName] = useState(""); 
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [{allVideos},dispath]=useStateValue();

    useEffect(()=>{
        if(!allVideos){
        getAllVideos().then((data)=>{
            dispath({
                type:actionType.SET_ALL_VIDEOS,
                allVideos:data.videos,
            })
        })
    }})
    

  return (
    <div className='flex flex-col items-center justify-center p-4 borfer border-gray-300 gap-4 rounded-md'>
        <input type="text" placeholder='Type video name...'
        className='w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent' 
        value={videoName}
        onChange={(e)=> setVideoName(e.target.value)}/>

        <div className='flex gap-4'>
            <FilterButtons filterData={filters}flag={"Category"}/>
            <FilterButtons filterData={levelFilter}flag={"Level"}/>
            </div>
            <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
              {isImageLoading && <FileLoader progress={""} />}
            </div>
    </div>
  )
}
export const FileLoader=({progress})=>{
  return(
    <div>
      
    </div>
  )
}

export default DashboardNewVideo