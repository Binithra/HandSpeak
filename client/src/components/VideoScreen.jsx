import React from "react";
import { NavLink } from "react-router-dom";

const vid1 = (
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/YHFWhBUn5Fk"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
);

const VideoScreen = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/Videos"}>
            <a className="btn btn-ghost normal-case text-xl">
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
      <div className="bg-teal-600">
        <div className="text-2xl font-semibold p-4 text-white">
          'ස' ඉගෙන ගනිමු
        </div>
      </div>
      <div className="pt-8">
        {vid1}
        <p className="text-2xl font-semibold p-16 text-yellow-700">
          {" "}
          'ස' සහිත වචන : සතුන්, සඳ, සමග, සමග{" "}
        </p>
        <button className="btn btn-primary text-white">Next</button>
      </div>
    </div>
  );
};

export default VideoScreen;
