import React from "react";

const SupportCard = ({ image, content, description, nav }) => {
  return (
    <div className="backdrop-blur-md bg-white/30 rounded-3xl p-7 w-80 m-8 shadow-lg ">
      <div className="flex flex-row gap-4 items-center justify-center">
        <img src={image} alt="icon" className="w-20 h-20 " />
      </div>
      <div className="flex flex-col gap-2 py-2 text-green-600 font-semibold text-xl items-center justify-center">
        {content}
      </div>
      <div>{description}</div>
      <div>{nav}</div>
    </div>
  );
};

export default SupportCard;
