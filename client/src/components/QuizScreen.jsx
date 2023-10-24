import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllQuiz } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

// const quiz1 = ({ data }) => {
//   <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <p className="text-base text-headingColor pt-4 font-semibold my-2">
//         {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
//         <span className="block text-sm text-gray-400 my-1">
//           {data.category}
//         </span>
//       </p>

// </motion.div>
// }

const QuizScreen = () => {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();
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
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/Quiz"}>
            <a className="btn btn-ghost normal-case text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Back
            </a>
          </NavLink>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-teal-600">
        <div className="text-2xl font-semibold p-4 text-white">
          Recognize the letter
        </div>
      </div>
      {quiz && (
        <motion.div
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
          <p className="text-base text-headingColor pt-4 font-semibold my-2">
            {quiz.name.length > 25 ? `${quiz.name.slice(0, 25)}..` : quiz.name}
            <span className="block text-sm text-gray-400 my-1">
              {quiz.category}
            </span>
          </p>
          {/* Add more details as needed */}
        </motion.div>
      )}
    </div>
  );
};

export default QuizScreen;
