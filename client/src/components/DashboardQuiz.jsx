import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoAdd, IoTrash } from "react-icons/io5";
import { getAllQuiz, deleteQuizById } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import QuizCard from "./QuizCard";

const DashboardQuiz = () => {
  const [quizFilter, setQuizFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allquiz, isViewing }, dispatch] = useStateValue();
  const [showQuizScreen, setShowQuizScreen] = useState(false);

  useEffect(() => {
    //to fetch all quiz
    if (!allquiz) {
      getAllQuiz().then((data) => {
        console.log(data.quiz);
        dispatch({
          type: actionType.SET_ALL_QUIZ,
          allquiz: data.quiz,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newQuiz"}
          className="flex items-center px-4 py-3 font-semibold border-2 rounded-md border-orange-500 hover:shadow-md cursor-pointer gap-4"
        >Add New Quiz
          <IoAdd />
        </NavLink>
      </div>
      {/* Main Container */}
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        {/* The count */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-black">Count : </span>
            {allquiz?.length}
          </p>
        </div>
        <QuizContainer data={allquiz} />
      </div>
    </div>
  );
};

export const QuizContainer = ({ data }) => {
  const [isDelete, setIsDelete] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((quiz, i) => (
          <QuizCard
            key={quiz._id}
            data={quiz}
            index={i}
            type="quiz"
            setSelectedQuiz={setSelectedQuiz}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            formatDate={(dateString) => {
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              return new Date(dateString).toLocaleDateString(
                undefined,
                options
              );
            }}
          />
        ))}
    </div>
  );
};

export default DashboardQuiz;
