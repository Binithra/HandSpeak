import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../config/firebase.config";
import { actionType } from "../context/reducer";
import { ref, deleteObject } from "firebase/storage";
import {
  getAllStorybooks,
  getAllVideos,
  deleteStorybookById,
  deleteVideoById,
} from "../api";

export const CardDisplay = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType, allBooks, allVideos,bookIndex, videoIndex, isVideoPlaying, isBookViewing}, dispatch] = useStateValue();

  const deleteData = (data) => {
    //Storybook deleting
    if (type === "storybook") {
      const deleteRef = ref(storage, data.coverURL);
      deleteObject(deleteRef).then(() => {});

      deleteStorybookById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);

          getAllStorybooks().then((data) => {
            dispatch({
              type: actionType.SET_ALL_BOOKS,
              allBooks: data.data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "error",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }

    //Video deleting
    if (type === "video") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      deleteVideoById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);

          getAllVideos().then((data) => {
            dispatch({
              type: actionType.SET_ALL_VIDEOS,
              allVideos: data.videos,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "error",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
  };
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

  const addToRead=()=>{
    if(!isBookViewing){
      dispatch({
        type: actionType.SET_ISBOOK_VIEWING,
        isBookViewing: true,
      });
    }
    if(bookIndex !== index){
      dispatch({
        type: actionType.SET_BOOK_INDEX,
        bookIndex: index,
      });
    }

  }

  return (
    
    <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <div className="w-40 h-60 rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL || data.coverURL}
          onClick={type ==="video" && addToContext || type==="storybook" && addToRead} 
          //this onClick opens the videoPlayer 
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-headingColor pt-4 font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data.category}
        </span>
      </p>

      {type === "video" || type === "storybook" ? (
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
      </div>
       ) : null}

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl text-headingColor font-semibold text-center">
            Are you sure to delete?
          </p>
          <div className="flex items-center gap-4 pt-8">
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-teal-300 rounded-md hover:bg-teal-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>

    
  );
};

export default CardDisplay;
