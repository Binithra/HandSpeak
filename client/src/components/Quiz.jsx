import React, { useState, useEffect } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import QuizCard from "./QuizCard";
import { getAllQuiz } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Quiz = () => {
  const [{ allquiz }, dispatch] = useStateValue();

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
  }, [allquiz, dispatch]);

  return (
    <div className="w-full h-auto pb-10 flex flex-col items-center justify-center bg-teal-100">
      {" "}
      <Header />
      <div className="text-2xl font-semibold p-8 align-center">
        ප්‍රශ්නාවලි සම්පූර්ණ කරමු
      </div>
      <QuizCardContainer data={allquiz} />
    </div>
  );
};

export const QuizCardContainer = ({ data }) => {
  const [isDelete, setIsDelete] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className=" flex flex-wrap gap-3 items-center justify-evenly">
       {Array.isArray(data) &&
        data.map((quiz, i) => (
          <QuizCard
            key={quiz._id}
            data={quiz}
            index={i}
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

export default Quiz;
