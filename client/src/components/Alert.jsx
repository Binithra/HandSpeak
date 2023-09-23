import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { motion } from "framer-motion";
import { BsEmojiFrown } from "react-icons/bs";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 50, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      key={type}
      className="w-screen z-50 fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        className={`fixed top-12 right-12 p-4 rounded backdrop-blur-md flex items-center justify-center shadow-md
    ${type === "success" && "bg-teal-600"}
    ${type === "error" && "bg-red-500"}`}
      >
        {type === "success" && (
          <div className="flex items-center justify-center gap-4">
            <BsEmojiWink className="text-3xl text-primary" />
            <p className="text-xl font-semibold text-primary">Data Saved</p>
          </div>
        )}

        {type === "error" && (
          <div className="flex items-center justify-center gap-4">
            <BsEmojiFrown className="text-3xl text-primary" />
            <p className="text-xl font-semibold text-primary">
              Something went wrong. Please try again!
            </p>
          </div>
        )}

        {/* {type === "fileUploadError" && (
          <div className="flex items-center justify-center gap-4">
            <BsEmojiFrown className="text-3xl text-primary" />
            <p className="text-xl font-semibold text-primary">
            Please select a PDF file for uploading.
            </p>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};

export default Alert;
