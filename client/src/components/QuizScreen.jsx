import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { L1 } from "../assets/img/index";
import Header from "./Header";

const QuizScreen = () => {
  const questions = [
    {
      questionText: "ලබා දී ඇති රූපය හඳුනා ගැනීමෙන්, අදාළ අකුර තෝරන්න.",
      answerOptions: [
        { answerText: "ය", isCorrect: false },
        { answerText: "ඉ", isCorrect: false },
        { answerText: "අ", isCorrect: true },
        { answerText: "ඇ", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      <Header />
      <div className="navbar bg-base-100">
        <NavLink to={"/dashboard/quiz"}>
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
      <div className="flex items-center justify-center w-full bg-amber-200 rounded-lg">
        {false ? (
          <div className="flex text-2xl items-center justify-center">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center p-8">
              <p className="text-base mb-8">
                Question {currentQuestion + 1}/{questions.length}
              </p>
              <div className="flex flex-col items-center mb-4 font-semibold text-teal-700 text-xl">
                {questions[currentQuestion].questionText}
                <img
                  src={L1}
                  alt="Sign Language Image"
                  className="max-w-full max-h-full mt-4"
                />
              </div>

              <div className="flex flex-wrap justify-center">
                {questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <button
                      key={answerOption.id}
                      className="text-xl text-blue-800 rounded-lg flex w-20 hover:bg-white p-2 justify-center border-2 border-blue-800 m-2"
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
