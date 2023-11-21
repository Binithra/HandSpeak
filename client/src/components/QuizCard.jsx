import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { getAllQuiz, deleteQuizById } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import QuizViewer from "./QuizViewer";
import { NavLink } from "react-router-dom";

const QuizCard = ({ data, quiz, formatDate, index }) => {
  const [{ allquiz, isViewing, user, isQuizViewing, quizIndex }, dispatch] =
    useStateValue();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const deleteData = async (data) => {
    deleteQuizById(data._id).then((res) => {
      if (res.data) {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });
        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);

        getAllQuiz().then((data) => {
          dispatch({
            type: actionType.SET_ALL_QUIZ,
            allquiz: data.quiz,
          });
        });
      } else {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "error",
        });
        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);
      }
    });
  };

  const addToDo = () => {
    if (!isQuizViewing) {
      dispatch({
        type: actionType.SET_ISQUIZ_VIEWING,
        isQuizViewing: true,
      });
    }
    if (quizIndex !== index) {
      dispatch({
        type: actionType.SET_QUIZ_INDEX,
        quizIndex: index,
      });
    }
  };

  return (
    <div className="flex w-3/4 h-20 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg">
      <motion.div className="w-auto flex flex-wrap gap-12 pl-24 items-center justify-evenly">
        <p className="text-base text-headingColor font-semibold ">
          Topic: {data.title}
        </p>
        {user?.user?.role === "Admin" && (
          <p className="text-base text-textColor ">
            Created on: {formatDate(data.createdAt)}
          </p>
        )}

        <motion.button
          onClick={() => addToDo()}
          className="text-[14px] font-semibold text-teal-700 flex items-center justify-evenly border border-teal-700 h-12 w-40 hover:bg-teal-700 hover:text-gray-200 bg-gray-200 rounded-sm hover:shadow-md"
          whileTap={{ scale: 0.7 }}
        >
          View Quiz
        </motion.button>

        {user?.user?.role === "Admin" && (
          <div className="absolute left-12 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200">
            <motion.i
              whileTap={{ scale: 0.75 }}
              className="text-base text-red-400 drop-shadow-md hover:text-red-600"
              onClick={() => setIsDelete(true)}
            >
              <IoTrash />
            </motion.i>
            <div className="absolute left-48 w-8 h-8 rounded-md flex items-center justify-center">
              {isDelete && (
                <motion.div
                  className="absolute w-375 rounded-md flex items-center justify-between p-4 border bg-gray-100 border-orange-800 cursor-pointer gap-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-xl text-headingColor font-semibold text-center">
                    Are you sure to delete?
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.button
                      className="px-2 py-1 text-sm uppercase font-semibold bg-teal-300 rounded-md hover:bg-teal-700 cursor-pointer"
                      whileTap={{ scale: 0.7 }}
                      onClick={() => deleteData(quiz)}
                    >
                      Yes
                    </motion.button>
                    <motion.button
                      className="px-2 py-1 text-sm uppercase bg-red-300 font-semibold rounded-md hover:bg-red-700 cursor-pointer"
                      whileTap={{ scale: 0.7 }}
                      onClick={() => setIsDelete(false)}
                    >
                      No
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizCard;
