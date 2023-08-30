import React, { useEffect } from "react";
import { SlBookOpen, SlUser } from "react-icons/sl";
import { RxVideo } from "react-icons/rx";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllUsers, getAllVideos, getAllStorybooks } from "../api";
import { bgColors } from "../utils/styles";

export const DashBoardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const [{ allUsers, allVideos, allStorybooks }, dispatch] = useStateValue();
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
          allVideos: data.data,
        });
      });
    }

    if (!allStorybooks) {
      getAllStorybooks().then((data) => {
        dispatch({
          type: actionType.SET_ALL_STORYBOOKS,
          allStorybooks: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashBoardCard
        icon={<SlUser className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashBoardCard
        icon={<RxVideo className="text-3xl text-textColor" />}
        name={"Videos"}
        count={allVideos?.length > 0 ? allVideos?.length : 0}
      />
      <DashBoardCard
        icon={<SlBookOpen className="text-3xl text-textColor" />}
        name={"Storybooks"}
        count={allStorybooks?.length > 0 ? allStorybooks?.length : 0}
      />
    </div>
  );
};

export default DashBoardHome;