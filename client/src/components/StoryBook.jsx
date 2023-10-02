import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Con5, Con4, Con } from "../assets/img/index";
import { NavLink } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useStateValue } from "../context/StateProvider";
import { getAllStorybooks } from "../api";
import { actionType } from "../context/reducer";
import { CardDisplay } from "./CardDisplay";

const StoryBook = () => {
  const [storybooks, setStorybooks] = useState([]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [viewPdf, setViewPdf] = useState(null);
  const [bookToRead, setBookToRead] = useState([]);
  const [{ allBooks }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allBooks) {
      getAllStorybooks().then((data) => {
        console.log(data.storybooks);
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allBooks: data.storybooks,
        });
      });
    }
  }, []);

  const closeModal = () => {
    setShowBookModal(false);
  };
  const showModal = (data) => {
    setShowBookModal(true);
    setBookToRead(data);
    console.log("data", data);
  };

  return (
    <div className="w-full h-auto pb-10 flex flex-col items-center justify-center bg-pink-100">
      <Header />
      <div className="text-2xl font-semibold pt-8 pb-12">
        ඔබ කියවීමට කැමති පොතක් තෝරන්න.
      </div>
      {/* Main Container */}

      <UserBookContainer data={allBooks} />
    </div>
  );
};

export const UserBookContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((storybooks, i) => (
          <CardDisplay
            key={storybooks._id}
            data={storybooks}
            index={i}
            type="userDisplayStorybook"
          />
        ))}
    </div>
  );
};

export default StoryBook;
