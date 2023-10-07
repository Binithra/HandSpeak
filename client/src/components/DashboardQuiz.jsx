import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllQuiz} from "../api";
import { actionType } from "../context/reducer";
import {CardDisplay} from './CardDisplay'

const DashboardQuiz = () => {
  const [quizFilter, setQuizFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const[{allquiz},dispatch] = useStateValue()

  useEffect(()=>{
    if(!allquiz){
      getAllQuiz().then((data)=>{
        console.log(data.quiz);
        dispatch({
          type:actionType.SET_ALL_QUIZ,
          allquiz:data.quiz,
        })
      })
    }


  },[])

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newQuiz"}
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
          value={quizFilter}
          onChange={(e) => setQuizFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
        </i>
      </div>
      {/* Main Container */}
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
            {/* The count */}
            <div className="absolute top-4 left-4">
              <p className="text-xl font-bold"><span className="text-sm font-semibold text-black">Count : </span>
              {allquiz?.length}
              </p></div>
              <QuizContainer data={allquiz} /></div>


    </div>
  );
};

export const QuizContainer =({data})=>{
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((quiz,i)=>(
        <CardDisplay key={quiz._id} data={quiz} index={i} type="quiz"/>
      ))}
    </div>
  )

  
}

export default DashboardQuiz;
