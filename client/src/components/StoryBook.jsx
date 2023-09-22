import React,  { useState, useEffect } from "react";
import Header from "./Header";
import { Con5, Con4, Con } from "../assets/img/index";
import { NavLink } from "react-router-dom";
// import { Button } from "./components/Button";
// import { Modal } from "./components/Modal";
import {getDownloadURL, ref} from 'firebase/storage'
import { storage } from "../config/firebase.config";

export const ResumeButton = ({setModal}) => {
  return (
    <button className='btn btn-primary btn-md'
    onClick={()=>setModal(true)}>View my Resume</button>
  )
}

const StoryBook = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-300">
      <Header />
      <div className="text-2xl font-semibold pt-8 pb-12">
        ඔබ කියවීමට කැමති පොතක් තෝරන්න.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 pl-12 gap-20">
        <Bookcover1 />
        <Bookcover2 />
        <Bookcover3 />
      </div>
    </div>
  );
};

export const Bookcover1 = () => {
  const [modal, setModal]=useState(false);
  const [resume, setResume]=useState(null);

  useEffect(()=>{
    getDownloadURL(ref(storage, 'https://firebasestorage.googleapis.com/v0/b/learningplatform-1c912.appspot.com/o/Book%2F1694937278229-DATA%20COLLECTION%20FORM.pdf?alt=media&token=f672364c-9d22-4fe4-b351-8164b4f1c181')).then((url)=>{
      setResume(url);
    })
  },[])

  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con5}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - මම පොඩිද?</h2>
        <p className="text-white">කතෘ - පිලිප් පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
          <ResumeButton />

      {/* {modal===true&&(
        <Modal setModal={setModal} resume={resume}/>
      )} */}

          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const Bookcover2 = () => {
  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con4}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - සිංහල හෝඩි පොත</h2>
        <p className="text-white">කතෘ - පිලිප් පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">කියවන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const Bookcover3 = () => {
  return (
    <div className="card card-compact w-80 bg-black shadow-xl">
      <figure>
        <img
          src={Con}
          type="image/jpeg"
          className="w-full h-full object-cover"
        ></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">මාතෘකාව - තොප්පි වෙළෙන්දා</h2>
        <p className="text-white">කතෘ - සකුන්තලා පෙරේරා</p>
        <div className="card-actions justify-end">
          <NavLink to={"/QuizScreen2"}>
            <button className="btn btn-primary">කියවන්න</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default StoryBook;
