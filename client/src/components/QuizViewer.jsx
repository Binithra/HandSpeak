import React, { useEffect, useContext, useState } from "react";
// import Header from "./Header";
import { NavLink } from "react-router-dom";
import { quizContext } from "./DashboardNewQuiz";
import { useStateValue } from "../context/StateProvider";

const QuizViewer = () => {
  const [{ quiz, option, i }, dispatch] = useStateValue();
  const [{ allquiz, quizIndex }] = useStateValue();
  const data = allquiz[quizIndex];
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

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

  return (
    <div className="flex flex-col w-screen min-h-screen bg-gray-100">

      {/* <Header /> */}
      <div className="navbar bg-base-100">
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

      <form method="GET">
      
          <div className=" card my-3 card-body">
            <h5 className="card-title">{data.question}</h5>
              <div className="row">
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
            {/* ))} */}
          </div>
          <div className="mt-2 ml-8">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Handle submission logic, e.g., check the answer
                console.log("Selected Option:", selectedOption);
              }}
            >
              Submit Answer
            </button>
          </div>

          {/* Uncomment the following lines if you want to add a delete button */}
          {/* <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
          onClick={() => {
            // Handle deleteQuiz logic
          }}
        >
          Delete Quiz
        </button> */}
      </form>
    </div>
  );
};

export default QuizViewer;
