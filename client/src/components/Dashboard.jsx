import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardStorybook from "./DashboardStorybook";
import DashboardVideo from "./DashboardVideo";
import DashboardHome from "./DashboardHome";
import DashboardUser from "./DashboardUser";
import { useStateValue } from "../context/StateProvider";
import Header from "./Header";

const Dashboard = () => {
  const [{ userCount }] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/home"}><IoHome className="text-2xl text-textColor" /></NavLink>
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Users </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/videos"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Videos </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/storybooks"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Storybooks </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/videos" element={<DashboardVideo />} />
          <Route path="/storybooks" element={<DashboardStorybook />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
