import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllQuiz } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const QuizViewer = ({ quizId, formatDate }) => {
  const [{ allquiz }, dispatch] = useStateValue();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    console.log("QuizViewer - Fetching data...");
    if (!allquiz) {
      getAllQuiz().then((data) => {
        console.log(data.quiz);
        dispatch({
          type: actionType.SET_ALL_QUIZ,
          allquiz: data.quiz,
        });

        const foundQuiz = data.quiz.find((data) => data._id === quizId);
        console.log("QuizViewer - Found quiz:", foundQuiz);
        setCurrentQuiz(foundQuiz);
      });
    } else {
      const foundQuiz = allquiz.find((data) => data._id === quizId);
      console.log("QuizViewer - Found quiz:", foundQuiz);
      setCurrentQuiz(foundQuiz);
    }
  }, [allquiz, dispatch, quizId]);

  console.log("QuizViewer - Current quiz:", currentQuiz);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  if (!currentQuiz) {
    console.log("QuizViewer - Loading...");
    return <p>Loading...</p>;
  }


  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
    <div className="navbar bg-base-100">
      <div className="flex-1">
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
      <div className="pt-8 flex flex-wrap gap-4 grid-cols-4">
          <h2 className="font-semibold">{currentQuiz.title} </h2>
          {currentQuiz.questions.map((question, id) => (
            <div key={id}>
              <h3>{question.questionName}</h3>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question_${id}`}
                        value={answer}
                        onChange={() => handleAnswerChange(id, answer)}
                      />
                      {answer}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizViewer

