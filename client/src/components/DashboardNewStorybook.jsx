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
import { getAllStorybooks, saveNewStorybook } from "../api";
import { actionType } from "../context/reducer";

const DashboardNewStorybook = () => {
  //story book image cover
  const [storybookName, setStorybookName] = useState("");
  const [storybookImageCover, setStorybookImageCover] = useState(null);
  const [storybookImageUrl, setStorybookImageUrl] = useState(null);
  const [bookImageUploadProgress, setBookImageUploadProgress] = useState(0);
  const [isBookImageLoading, setIsBookImageLoading] = useState(false);

  // the book
  const [bookImageCover, setBookImageCover] = useState(null);
  const [bookUploadingProgress, setBookUploadingProgress] = useState(0);
  const [isbookLoading, setIsBookLoading] = useState(false);
  // const [{ allBooks, filterTerm, alertType }, dispatch] = useStateValue();
  const [{ allBooks, filterTerm, levelFilter, alertType }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allBooks) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allBooks: data.data,
        });
      });
    }
  });

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsBookImageLoading(true);
      setIsBookLoading(true);

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
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
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
      setStorybookImageCover(null);
      setBookImageCover(null);
      setIsBookImageLoading(false);
      setIsBookLoading(false);
    });
  };

  const saveStorybook = () => {
    if (!storybookImageCover && !bookImageCover) {
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
    } else {
      setIsBookLoading(true);
      setIsBookImageLoading(true);

      const data = {
        name: storybookName,
        coverURL: storybookImageCover,
        bookURL: bookImageCover,
           };

      saveNewStorybook(data).then((res) => {
        getAllStorybooks().then((data) => {
          dispatch({
            type: actionType.SET_ALL_BOOKS,
            allBooks: data.data,
          });
        });
      });
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

      setStorybookName(null);
      setIsBookLoading(false);
      setIsBookImageLoading(false);
      setStorybookImageCover(null);
      setBookImageCover(null);
      dispatch({ type: actionType.SET_LEVEL_FILTER, levelFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type book name..."
        className="w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={storybookName}
        onChange={(e) => setStorybookName(e.target.value)}
      />

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isBookImageLoading && (
          <FileLoader progress={bookImageUploadProgress} />
        )}
        {!isBookImageLoading && (
          <>
            {!storybookImageCover ? (
              <FileUploader
                updateState={setStorybookImageCover}
                setProgress={setBookImageUploadProgress}
                isLoading={setIsBookImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={storybookImageCover}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteFileObject(storybookImageCover, true);
                  }}
                >
                  <MdDelete className="text-white " />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Book uploading */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isbookLoading && <FileLoader progress={bookUploadingProgress} />}
        {!isbookLoading && (
          <>
            {!bookImageCover ? (
              <FileUploader
                updateState={setBookImageCover}
                setProgress={setBookUploadingProgress}
                isLoading={setIsBookLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <input
                  src={bookImageCover}
                  type="file"
                  accept=".pdf"
                  id="pdf-upload"
                  style={{ display: "none" }}
                />
                <label for="pdf-upload">
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                    onClick={() => {
                      deleteFileObject(bookImageCover, true);
                    }}
                  >
                    <MdDelete className="text-white " />
                  </button>
                </label>
                {bookImageCover && (
                  <embed
                    src={bookImageCover}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {isBookImageLoading || isbookLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full text-white rounded-md bg-red-600 hover:shadow-lg"
            onClick={saveStorybook}
          >
            Save Storybook
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
      className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 inline-flex items-center"
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
  const [{ alertType }, dispatch] = useStateValue();

  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "BookCover" : "Book"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);

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
            Click to upload {isImage ? "an image for the book" : "a book"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={isImage ? "image/*" : ".pdf"}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashboardNewStorybook;
