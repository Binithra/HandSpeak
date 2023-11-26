import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { getAllQuiz, deleteQuizById } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";

const QuizCard = ({
  data,
  quiz,
  formatDate,
  index,
  handleAnswerSelection,
  // handleOptionChange,
}) => {
  const [
    { allquiz, isViewing, user, isQuizViewing, quizIndex, alertType },
    dispatch,
  ] = useStateValue();
  // const [{ user }] = useStateValue();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(0);
  // const [flag, setFlag] = useState(0);
  const [showScore, setShowScore] = useState(true);


const [answered, setAnswered] = useState(false);

  const handleOptionChange = (value) => {

    setAnswered(true)
    const selectedOption = value;
    if (selectedOption === data.answer) {
      // Increment the score by 10 for each correct answer
      handleAnswerSelection();
    }
    // Notify the parent component about the answer selection
   // handleAnswerSelection(selectedOption);
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

  return (
    <div className="flex w-275 bg-gray-100 shadow-md rounded-lg">
      <form method="GET">
        {" "}
        <div className=" flexitems-center justify-evenly card card-body">
          <p className="text-base text-headingColor font-semibold ">
            {data.question}
          </p>
          <img
            className=" rounded-lg object-cover w-56 h-44"
            src={data.imageURL}
          />
          
          <div className=" p-2 ">
            <div className="form-check">
              <input
                className="form-check-input mr-4 "
                type="radio"
                id={data.option1}
                name="quizOptions"
                value={data.option1}
                onClick={() => handleOptionChange(data.option1)}
                disabled={answered ? true : false}
              />
              <label className="text-black" for="flexRadioDefault2">
                {data.option1}
              </label>
            </div>
          
            <div className="form-check">
              <input
                type="radio"
                id={data.option2}
                name="quizOptions"
                value={data.option2}
                onClick={() =>handleOptionChange(data.option2)}
                className="form-check-input mr-4"
                disabled={answered ? true : false}
              />
              <label className="text-black" for={data.option2}>
                {data.option2}
              </label>
            </div>
          
            <div className="form-check">
              <input
                type="radio"
                id={data.option3}
                name="quizOptions"
                value={data.option3}
                onClick={() =>handleOptionChange(data.option3)}
                className="form-check-input mr-4"
                disabled={answered ? true : false}
              />
              <label className="text-black" for={data.option3}>
                {data.option3}
              </label>
            </div>
          
            <div className="form-check">
              <input
                type="radio"
                id={data.option4}
                name="quizOptions"
                value={data.option4}
                onClick={() => handleOptionChange(data.option4)}
                className="form-check-input mr-4"
                disabled={answered ? true : false}
              />
              <label className="text-black" for={data.option4}>
                {data.option4}
              </label>
            </div>
            { answered && (
              <p className="text-base text-headingColor font-semibold ">Answer : {data.answer}</p>
            )}

            {/* clear answer button
            { answered && (
              <button className="btn btn-xs bg-blue-50" onClick={() => setAnswered(false)}>Clear Answer</button>
            )} */}
            
          </div>

          {user?.user?.role === "Admin" && (
            <div className="absolute right-8 bottom-8 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200">
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
      </form>
    </div>
  );
};

export default QuizCard;
