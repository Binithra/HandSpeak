import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardStorybook from "./DashboardStorybook";
import DashboardVideo from "./DashboardVideo";
import DashboardHome from "./DashboardHome";
import DashboardUser from "./DashboardUser";
import DashboardNewStorybook from "./DashboardNewStorybook";
import DashboardNewVideo from "./DashboardNewVideo";
import { useStateValue } from "../context/StateProvider";
import Header from "./Header";
import Alert from "./Alert";
import DashboardNewQuiz from "./DashboardNewQuiz";
import DashboardQuiz from "./DashboardQuiz";

const Dashboard = () => {
  const [{ alertType }, dispatch] = useStateValue();
  const [{ userCount }] = useStateValue();
  return (
    <div className="w-full h-screen flex flex-col ">
      <Header />

      <div className="w-full my-2 p-4 flex items-center justify-evenly  bg-pink-200">
        {/* <NavLink to={"/dashboard/home"}><IoHome className="text-2xl text-yellow-600" /></NavLink> */}

        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          {" "}
          Manage Users{" "}
        </NavLink>

        <NavLink
          to={"/dashboard/videos"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          {" "}
          Manage Videos{" "}
        </NavLink>

        <NavLink
          to={"/dashboard/storybooks"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          {" "}
          Manage Storybooks{" "}
        </NavLink>

        <NavLink
          to={"/dashboard/quiz"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          {" "}
          Manage Quiz{" "}
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/videos" element={<DashboardVideo />} />
          <Route path="/storybooks" element={<DashboardStorybook />} />
          <Route path="/newStorybook" element={<DashboardNewStorybook />} />
          <Route path="/newVideo" element={<DashboardNewVideo />} />
          <Route path="/newQuiz" element={<DashboardNewQuiz />} />
          <Route path="/quiz" element={<DashboardQuiz />} />
        </Routes>
      </div>

      {alertType && <Alert type={alertType} />}
      
    </div>
  );
};

export default Dashboard;
