import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { getAllQuiz, deleteQuizById } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";

const QuizCard = ({ data, quiz, formatDate, index }) => {
  const [{ allquiz, isViewing, user, isQuizViewing, quizIndex ,alertType}, dispatch] =
    useStateValue();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const addScore = () => {
    // if(value == quiz.answer && flag == 0 ){
    //    score=1
    //     window.val = window.val + score;
    //     flag = 1;
    // }
    // else if(flag==1 && value != quiz.answer){
    //     window.val = window.val - 1;
    //     flag=0;
    // }
    // else{
    //    score=0
    // }
    // console.log(score, typeof score);
    // console.log(window.val);
    // sessionStorage.setItem("val", window.val);
  };

  const deleteData = (data) => {
    // const deleteRef = ref(storage, data.quizImageURL);
    //   deleteObject(deleteRef).then(() => {});

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

  // const addToDo = () => {
  //   if (!isQuizViewing) {
  //     dispatch({
  //       type: actionType.SET_ISQUIZ_VIEWING,
  //       isQuizViewing: true,
  //     });
  //   }
  //   if (quizIndex !== index) {
  //     dispatch({
  //       type: actionType.SET_QUIZ_INDEX,
  //       quizIndex: index,
  //     });
  //   }
  // };

  return (
    <div className="flex w-300 bg-gray-100 shadow-md rounded-lg">
      <form method="GET">
        {" "}
        <div className=" flexitems-center justify-evenly card card-body">
          <p className="text-base text-headingColor font-semibold ">
            Topic: {data.question}
          </p>
          <img
            className=" rounded-lg object-cover w-56 h-44"
            src={data.imageURL}
          />
          <div className="row ">
            <div className="form-check">
              <input
                className="form-check-input mr-4"
                type="radio"
                id={data.option1}
                name="quizOptions"
                value={data.option1}
                onClick={() => {
                  value = quiz.option1;
                  console.log(value);
                  addScore();
                }}
              />
              <label className="text-black" htmlFor={data.option1}>
                {data.option1}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="form-check">
              <input
                type="radio"
                id={data.option2}
                name="quizOptions"
                value={data.option2}
                onClick={() => {
                  value = quiz.option2;
                  console.log(value);
                  addScore();
                }}
                className="form-check-input mr-4"
              />
              <label className="text-black" htmlFor={data.option2}>
                {data.option2}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="form-check">
              <input
                type="radio"
                id={data.option3}
                name="quizOptions"
                value={data.option3}
                onClick={() => {
                  value = quiz.option3;
                  console.log(value);
                  addScore();
                }}
                className="form-check-input mr-4"
              />
              <label className="text-black" htmlFor={data.option3}>
                {data.option3}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="form-check">
              <input
                type="radio"
                id={data.option4}
                name="quizOptions"
                value={data.option4}
                onClick={() => {
                  value = quiz.option4;
                  console.log(value);
                  addScore();
                }}
                className="form-check-input mr-4"
              />
              <label className="text-black" htmlFor={data.option4}>
                {data.option4}
              </label>
            </div>
          </div>

          <div className="mt-2 ml-12">
            {user?.user?.role === "Admin" && (
              <div className="absolute left-8 bottom-8 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200">
                <motion.i
                  whileTap={{ scale: 0.75 }}
                  className="text-base text-red-400 drop-shadow-md hover:text-red-600"
                  onClick={() => setIsDelete(true)}
                >
                  <IoTrash />
                </motion.i>
                
                  {isDelete && (
                    <motion.div
                      className="absolute w-225 rounded-md flex items-center justify-between p-1 border bg-white border-orange-800 cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-xl text-headingColor font-semibold text-center mr-4">
                        Are you sure to delete?
                      </p>
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="px-2 py-1 text-sm uppercase font-semibold bg-teal-300 rounded-md hover:bg-teal-700 cursor-pointer"
                          whileTap={{ scale: 0.7 }}
                          onClick={() => deleteData(data)}
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
          )}
          </div>
          {/* {user?.user?.role === "Admin" && (
          <p className="text-base text-textColor ">
            Created on: {formatDate(data.createdAt)}
          </p>
        )} */}

          {/* <motion.button
          onClick={() => addToDo()}
          className="text-[14px] font-semibold text-teal-700 flex items-center justify-evenly border border-teal-700 h-12 w-40 hover:bg-teal-700 hover:text-gray-200 bg-gray-200 rounded-sm hover:shadow-md"
          whileTap={{ scale: 0.7 }}
        >
          View Quiz
        </motion.button> */}
        <button
              type="button"
              className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 w-40 ml-12"
              onClick={() => {
                // Handle submission logic, e.g., check the answer
                console.log("Selected Option:", selectedOption);
              }}
            >
              Submit Answer
            </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCard;
