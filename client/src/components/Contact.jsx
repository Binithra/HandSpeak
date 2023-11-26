import React, { useEffect } from "react";
import { SlCallOut, SlUser, SlEnvolope, SlLocationPin } from "react-icons/sl";
import { useStateValue } from "../context/StateProvider";
import { NavLink } from "react-router-dom";

export const ContactCard1 = ({ icon }) => {
  return (
    <div
      className={`w-72 gap-4 h-72 ackdrop-blur-md bg-white/30 rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-base text-textColor font-light mb-8">ගුරුවරයාගේ නම</p>
      <p className="text-xl text-textColor font-semibold">ඒ.බී.සී. පෙරේරා මහතා</p>
    </div>
  );
};
export const ContactCard2 = ({ icon }) => {
  return (
    <div
      className={` w-80 gap-4 h-72 ackdrop-blur-md bg-white/30 rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-base text-textColor font-light mb-6">දුරකථන අංකය</p>
      <p className="text-xl text-textColor font-semibold">077 7712 1111</p>
    </div>
  );
};
export const ContactCard3 = ({ icon, name, text }) => {
  return (
    <div
      className={`w-80 gap-4 h-72 ackdrop-blur-md bg-white/30 rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-base text-textColor font-light mb-8">ඊතැපැල් ලිපිනය</p>
      <p className="text-xl text-textColor font-semibold">abc@gmail.com</p>
    </div>
  );
};
export const ContactCard4 = ({ icon, name, text }) => {
  return (
    <div
      className={`w-80 gap-4 h-72 ackdrop-blur-md bg-white/30 rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-base text-textColor font-light mb-12"> ලිපිනය</p>

      <p className="text-l ml-4 text-textColor font-semibold">
        අංක 111/A, ප්‍රධාන වීදිය,
       
        මීගමුව.{" "}
      </p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="w-full h-screen flex bg-purple-100 justify-evenly flex-wrap p-4">
      <div className="w-full flex ">
        <NavLink to={"/Support"}>
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
      <ContactCard1
        icon={<SlUser className="text-3xl text-textColor" />}
      />
      <ContactCard2
        icon={<SlCallOut className="text-3xl text-textColor" />}
      />
      <ContactCard3
        icon={<SlEnvolope className="text-3xl text-textColor" />}
      />
      <ContactCard4
        icon={<SlLocationPin className="text-3xl text-textColor" />}
      />
    </div>
  );
};

export default Contact;
