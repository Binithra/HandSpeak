import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd} from "react-icons/io5";
import { useStateValue } from "../context/StateProvider";
import { getAllStorybooks } from "../api";
import {actionType} from '../context/reducer'
import {BookDisplay} from './BookDisplay'

const DashboardStorybook=()=> {
  const [storybookFilter, setStorybookFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const[{allBooks},dispatch] = useStateValue();

  useEffect(()=>{
    if(!allBooks){
        getAllStorybooks().then((data)=>{
        // console.log(data.storybooks);
        dispatch({
          type:actionType.SET_ALL_BOOKS,
          allBooks:data.storybooks,
        })
      })
    }


  },[])
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newStorybook"}
          className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={storybookFilter}
          onChange={(e) => setStorybookFilter(e.target.value)}
          onBlur={() => {setIsFocus(false);}}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer"/>
        </i>
      </div>
          {/* Main Container */}
          <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
            {/* The count */}
            <div className="absolute top-4 left-4">
              <p className="text-xl font-bold"><span className="text-sm font-semibold text-black">Count : </span>
              {allBooks?.length}
              </p></div>
              <BookContainer data={allBooks} /></div>

    </div>
  );
        }

  // internal component creating
  export const BookContainer =({data})=>{
    return(
      <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
        {data && data.map((storybooks,i)=>(
          <BookDisplay key={storybooks._id} data={storybooks} index={i}/>
        ))}
      </div>
    )
  
    
  }

export default DashboardStorybook;

