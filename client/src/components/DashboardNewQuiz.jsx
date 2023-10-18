import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import { getAllQuiz, saveNewQuiz } from "../api";
import { actionType } from "../context/reducer";

const DashboardNewQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [{ allquiz}, dispatch] = useStateValue();
    const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", "", ""]);

  const handleIncorrectAnswerChange = (index, value) => {
    const newIncorrectAnswers = [...incorrectAnswers];
    newIncorrectAnswers[index] = value;
    setIncorrectAnswers(newIncorrectAnswers);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionName: question,
        correctAnswer: correctAnswer,
        answers: [...incorrectAnswers, correctAnswer],
      },
    ]);
    // Reset question-related state
    setQuestion("");
    setCorrectAnswer("");
    setIncorrectAnswers(["", "", ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Question:", question);
    console.log("Correct Answer:", correctAnswer);
    console.log("Incorrect Answers:", incorrectAnswers);
  };

  useEffect(() => {
    if (!allquiz) {
      getAllQuiz().then((data) => {
        dispatch({
          type: actionType.SET_ALL_QUIZ,
          allquiz: data.quiz,
        });
      });
    }
  });

  const saveQuiz = () => {
      const data = {
        title:quizTitle,
        questions: question,
      };
      saveNewQuiz(data).then((res) => {
        getAllQuiz().then((quiz) => {
          dispatch({
            type: actionType.SET_ALL_QUIZ,
            allquiz: quiz.quiz,
          });
        });
      });
      dispatch({
        type:actionType.SET_ALERT_TYPE,
        alertType:"success"
      })
      setInterval(() => {
        dispatch({
          type:actionType.SET_ALERT_TYPE,
        alertType:null
        }) 
      }, 4000);

      setQuizTitle("");
      setQuestions([]);

    }


  return (
<div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
<input
        type="text"
        placeholder="Type Quiz Title"
        className="w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Question:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Incorrect Answers:
          </label>
          {incorrectAnswers.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={incorrectAnswers[index]}
              onChange={(e) => handleIncorrectAnswerChange(index, e.target.value)}
              required
            />))}
        </div>

        <button
          type="button"
          className="px-4 py-2 w-50 text-white rounded-md bg-teal-600 hover:shadow-lg"
          onClick={addQuestion}
        >
          Add Question
        </button>

      </form>
      
      <button
          type="submit"
          className="px-8 py-2 w-60 text-white rounded-md bg-red-600 hover:shadow-lg"
          onClick={saveQuiz}
        >
          Save Quiz
        </button>
    </div>

  )
}

export default DashboardNewQuiz