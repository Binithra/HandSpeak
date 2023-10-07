import React, { useEffect } from "react";
import { SlBookOpen, SlUser, SlNote } from "react-icons/sl";
import { RxVideo } from "react-icons/rx";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllUsers, getAllVideos, getAllStorybooks } from "../api";
import { bgColors } from "../utils/styles";

export const DashBoardCard = ({ icon, name, userCount }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{userCount}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const [{ allUsers, allVideos, allBooks,allquiz }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allVideos) {
      getAllVideos().then((data) => {
        dispatch({
          type: actionType.SET_ALL_VIDEOS,
          allVideos: data.video,
        });
      });
    }

    if (!allBooks) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allBooks: data.storybooks,
        });
      });
    }

    if (!allquiz) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_BOOKS,
          allquiz: data.quiz,
        });
      });
    }

 
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashBoardCard
        icon={<SlUser className="text-3xl text-textColor" />}
        name={"Users"}
        userCount={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashBoardCard
        icon={<RxVideo className="text-3xl text-textColor" />}
        name={"Videos"}
        userCount={allVideos?.length > 0 ? allVideos?.length : 0}
      />
      <DashBoardCard
        icon={<SlBookOpen className="text-3xl text-textColor" />}
        name={"Storybooks"}
        userCount={allBooks?.length > 0 ? allBooks?.length : 0}
      />
      
    </div>
  );
};

export default DashBoardHome;
