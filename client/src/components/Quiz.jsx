import React, { useState, useEffect } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import QuizCard from "./QuizCard";
import { getAllQuiz } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Quiz = ({ data }) => {
  const [{ allquiz }, dispatch] = useStateValue();
  const [showScore, setShowScore] = useState(true);
  const [val, setVal] = useState("");
  const [score, setScore] = useState(0);
  const [seq, setSeq] = useState("");
  const [value, setValue] = useState("");

  const handleAnswerSelection = (selectedOption) => {
    // Assuming each correct answer adds 10 points
    setScore((prevScore) => prevScore + 10);
  };

  useEffect(() => {
    // Fetch all quizzes only if not already fetched
    if (!allquiz) {
      getAllQuiz().then((data) => {
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
      <QuizCardContainer
        data={allquiz}
        handleAnswerSelection={handleAnswerSelection}
        setScore={setScore}
      />
      <button
        className="btn btn-primary mx-2"
        onClick={() => setShowScore(true)}
      >
        GENERATE SCORE
      </button>
      <div className={showScore ? "d-flex" : "d-none"}>
        Your Score is : {score}
      </div>
      <div>
        <a href="/Quiz" class="btn btn-danger my-2" tabIndex="-1" role="button">
          REDO
        </a>
      </div>
    </div>
  );
};

export const QuizCardContainer = ({
  data,
  handleAnswerSelection,
  setScore,
}) => {
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
            handleAnswerSelection={handleAnswerSelection}
            setScore={setScore}
            // handleOptionChange={handleOptionChange}
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
