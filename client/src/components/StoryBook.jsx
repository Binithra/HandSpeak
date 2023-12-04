import React, { useState, useEffect } from "react";
import Header from "./Header";
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

  return (
    <div className="w-full h-auto pb-10 flex flex-col items-center justify-center bg-pink-100">
      <Header />
      <div className="text-2xl font-semibold pt-8 pb-12">
        ඔබ කියවීමට කැමති පොතක් තෝරන්න.📚
      </div>

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
