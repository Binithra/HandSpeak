import React, { useEffect, useState } from "react";
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
import { getAllVideos, saveNewVideo } from "../api";
import { actionType } from "../context/reducer";
import { filterByLevel, filters } from "../utils/supportfunctions";
import { IoMusicalNote } from "react-icons/io5";
import FilterButtons from "./FilterButtons";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewVideo = () => {
  const [videoName, setVideoName] = useState("");
  const [videoImageCover, setVideoImageCover] = useState(null);
  const [videoImageUrl, setVideoImageUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [{ allVideos, filterTerm, levelFilter }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allVideos) {
      getAllVideos().then((data) => {
        dispatch({
          type: actionType.SET_ALL_VIDEOS,
          allVideos: data.videos,
        });
      });
    }
  });

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setVideoImageCover(null);
      setAudioImageCover(null);
      setIsImageLoading(false);
      setIsAudioLoading(false);
    });
  };

  const saveVideo = () => {
    if (!videoImageCover || !audioImageCover) {
      //throw the alert
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: videoName,     
        imageURL:videoImageCover, 
        videoURL: audioImageCover,
        level:levelFilter,
        category: filterTerm,
      };
      saveNewVideo(data).then((res) =>{
        getAllVideos().then((videos)=>{
          dispatch({
            type:actionType.SET_ALL_VIDEOS,
            allVideos : videos.videos,

          })

        })
      })

      setVideoName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setVideoImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_LEVEL_FILTER, levelFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center p-4 borfer border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type video name..."
        className="w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
      />

      <div className="flex gap-8">
        <FilterButtons filterData={filters} flag={"Category"} />
        <FilterButtons filterData={filterByLevel} flag={"Level"} />
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!videoImageCover ? (
              <FileUploader
                updateState={setVideoImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={videoImageCover}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteFileObject(videoImageCover, true);
                  }}
                >
                  <MdDelete className="text-white " />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio file uploading */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <video
                  src={audioImageCover}
                  controls
                  className="w-full h-full object-cover"
                ></video>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteFileObject(audioImageCover, false);
                  }}
                >
                  <MdDelete className="text-white " />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full text-white rounded-md bg-red-600 hover:shadow-lg"
            onClick={saveVideo}
          >
            Save video
          </motion.button>
        )}
      </div>
    </div>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-teal-700  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-teal-700 blur-xl "></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Video"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl ">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "an image for the video" : "an video"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "video/*"}`}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashboardNewVideo;
