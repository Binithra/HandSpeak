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
  // const [isDelete, setIsDelete] = useState({});
  // const [selectedQuiz, setSelectedQuiz] = useState(null);
  

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((quiz, i) => (
          <QuizCard
            key={quiz._id}
            data={quiz}
            index={i}
            type="quiz"
            // setSelectedQuiz={setSelectedQuiz}
            // isDelete={isDelete}
            // setIsDelete={setIsDelete}
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

// export const QuizScreen = ({
//   selectedQuiz,
//   setSelectedQuiz,
//   allquiz,
//   formatDate,
// }) => {
//   const quiz = allquiz.find((data) => data._id === selectedQuiz);

//   return (
//     <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
//       {quiz ? (
//         <>
//           <h1>{quiz.title}</h1>
//           {/* Display other details of the quiz as needed */}
//           <p>Created on: {formatDate(quiz.createdAt)}</p>
//           {/* Add more details here as needed */}
//           <button onClick={() => setSelectedQuiz(null)}>Close Viewer</button>
//         </>
//       ) : (
//         <p>No quiz selected.</p>
//       )}
//     </div>
//   );
// };
export default DashboardQuiz;
