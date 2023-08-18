import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllUsers } from "../api";
import { Prog } from "../assets/img/index";

export const DashboardCard = () => {
  return (
    <div className="card card-compact w-80 bg-teal-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Letters</h2>
        <p>Description</p>
        <div className="card-actions justify-end">dashboard card</div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<Prog className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
    </div>
  );
};

export default Dashboard;
