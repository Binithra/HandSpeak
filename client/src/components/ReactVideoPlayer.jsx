import React from 'react'
import ReactPlayer from 'react-player'
import { motion } from "framer-motion";

const ReactVideoPlayer = ({videos , index, closeModal}) => {
  return (
    <motion.div
      className="w-1/2 border-2 bg-base-100 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      {/* if there is a button in form, it will close the modal */}
      <button
        className="btn btn-sm btn-circle btn-ghost absolute m-1"
        onClick={() => closeModal()}
      >
        ✕
      </button>
      <div className=" flex flex-row justify-center">
        <ReactPlayer className="" url={videos?.videoURL} controls={true} />
      </div>
      <p className="py-4 px-4 font-bold">
        {videos?.name}
        <br />
        <div className="badge badge-secondary">{videos?.level}</div>
      </p>
    </motion.div>
  );
}

export default ReactVideoPlayer