import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { getAllStorybooks } from "../api";
import { actionType } from "../context/reducer";
import CardDisplay from "./CardDisplay";
import { motion } from "framer-motion";

const DashboardStorybook = () => {
  const [storybookFilter, setStorybookFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allBooks }, dispatch] = useStateValue();
  const [filtereBooks, setFiltereBooks] = useState(null);

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

  useEffect(() => {
    if (storybookFilter) {
      const filtered = allBooks.filter((data) =>
        data.name.toLowerCase().includes(storybookFilter.toLowerCase())
      );
      setFiltereBooks(filtered);
    }
  }, [storybookFilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newStorybook"}
          className="flex items-center px-4 py-3 font-semibold border-2 rounded-md border-orange-500 hover:shadow-md cursor-pointer gap-4"
        >
          Add New Storybook
          <IoAdd />
        </NavLink>
      </div>
      {/* Main Container */}
      <div className="relative w-full my-4 py-16 border border-gray-300 rounded-md">
        {/* The count */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-black">Count : </span>
            {allBooks?.length}
          </p>
        </div>
        <BookContainer data={allBooks} searchFilter={storybookFilter} />
      </div>
    </div>
  );
};

// internal component creating
export const BookContainer = ({ data, handleSubmit }) => {

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.length > 0 ? (
        data.map((storybooks, i) => (
          <CardDisplay
            key={storybooks._id}
            data={storybooks}
            index={i}
            type="storybook"
          />
        ))
      ) : (
        <p>No storybooks found</p>
      )}
    </div>
  );
};

export default DashboardStorybook;
