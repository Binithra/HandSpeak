import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoAdd, IoTrash } from "react-icons/io5";
import { getAllQuiz, deleteQuizById } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const DashboardQuiz = () => {
  const [quizFilter, setQuizFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isDelete, setIsDelete] = useState({});
  const [{ allquiz, isViewing }, dispatch] = useStateValue();
  const [showQuizViewer, setShowQuizViewer] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // useEffect(() => {
  //   //to fetch all quiz
  //   if (!allquiz) {
  //     getAllQuiz().then((data) => {
  //       console.log(data.quiz);
  //       dispatch({
  //         type: actionType.SET_ALL_QUIZ,
  //         allquiz: data.quiz,
  //       });
  //     });
  //   }
  // }, []);

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
        <QuizContainer
          data={allquiz}
          setSelectedQuiz={setSelectedQuiz}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
        {showQuizViewer && (
          <QuizViewer
            selectedQuiz={selectedQuiz}
            setSelectedQuiz={setSelectedQuiz}
            allquiz={allquiz}
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
        )}
      </div>
    </div>
  );
};

export const QuizContainer = ({
  data,
  setSelectedQuiz,
  setIsDelete,
  isDelete,
}) => {
  const [{ alertType }, dispatch] = useStateValue();

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

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

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((quiz, i) => (
          <motion.div
            key={i}
            className="relative w-full rounded-md flex items-center justify-between py-4 bg-gray-200 cursor-pointer hover:bg-card hover:shadow-md"
          >
            {/* <div className=" flex items-center justify-center"> */}
              <p className="text-base text-blaleteck font-bold text-center pl-40">
                {quiz.title}
              </p>
              <p className="text-base text-textColor  pl-40">
                Created on : {formatDate(quiz.createdAt)}
              </p>
            {/* </div> */}
            <NavLink to={"/QuizViewer"}>
              <motion.button
                className="text-[14px] font-semibold text-teal-700 flex items-center px-4 h-12 w-40 hover:bg-teal-700 hover:text-gray-200 bg-gray-200 rounded-sm hover:shadow-md"
                whileTap={{ scale: 0.7 }}
                onClick={() => setSelectedQuiz(quiz._id)}
              >
                View Quiz
              </motion.button>
            </NavLink>

            <div className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200">
              <motion.i
                whileTap={{ scale: 0.75 }}
                className="text-base text-red-400 drop-shadow-md hover:text-red-600"
                onClick={() =>
                  setIsDelete((prev) => ({ ...prev, [quiz._id]: true }))
                }
              >
                <IoTrash />
              </motion.i>
            </div>
            {isDelete[quiz._id] && (
              <motion.div
                className="relative w-200 rounded-md flex items-center justify-between py-2 bg-pink-300 cursor-pointer flex-col px-2 gap-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xl text-headingColor font-semibold text-center">
                  Are you sure to delete?
                </p>
                <div className="flex items-center gap-4 pt-4">
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
          </motion.div>
        ))}
    </div>
  );
};

export const QuizViewer = ({
  selectedQuiz,
  setSelectedQuiz,
  allquiz,
  formatDate,
}) => {
  const quiz = allquiz.find((data) => data._id === selectedQuiz);

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {quiz ? (
        <>
          <h1>{quiz.title}</h1>
          {/* Display other details of the quiz as needed */}
          <p>Created on: {formatDate(quiz.createdAt)}</p>
          {/* Add more details here as needed */}
          <button onClick={() => setSelectedQuiz(null)}>Close Viewer</button>
        </>
      ) : (
        <p>No quiz selected.</p>
      )}
    </div>
  );
};
export default DashboardQuiz;
