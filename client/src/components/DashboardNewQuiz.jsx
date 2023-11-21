import React, { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { saveNewQuiz, getAllQuiz } from "../api";
import { actionType } from "../context/reducer";
import { createContext } from "react";

export const quizContext = createContext(); //This Context will hold all the states realted to note

const DashboardNewQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [{ allquiz }, dispatch] = useStateValue();
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", "", ""]);
  const { addQuiz } = context;
  const context = useContext(quizContext);
  const [select, setSelect] = useState("yes");

  // useEffect(() => {
  //   // Fetch all quizzes when the component mounts
  //   getAllQuiz().then((quiz) => {
  //     dispatch({
  //       type: actionType.SET_ALL_QUIZ,
  //       allquiz: quiz.quiz,
  //     });
  //   });
  // }, [dispatch]);

  const [quiz, setQuiz] = useState({
    id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
    mcq: select,
    code: "",
  });

  const saveQuiz = () => {
   

    addQuiz(
      quiz.question,
      quiz.option1,
      quiz.option2,
      quiz.option3,
      quiz.option4,
      quiz.answer,
      quiz.title,
      select,
    );
    setQuiz({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      title: "",
      mcq: select,
    });
    // if (res.data) {
    //   dispatch({
    //     type: actionType.SET_ALERT_TYPE,
    //     alertType: "success",
    //   });
    //   setInterval(() => {
    //     dispatch({
    //       type: actionType.SET_ALERT_TYPE,
    //       alertType: null,
    //     });
    //   }, 4000);}
  };

  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value }); //whatever value inside the quiz object will exist as it is but jo properties aage likhi ja rhi hai inko add ya overwrite kar dena
  };

   return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type Quiz Title"
        className="w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        id="title"
        name="title"
        onChange={onChange}
        value={quiz.title}
        required
      />

      {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Question:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id={question}
            name={question}
            onChange={(e) => onChange(e.target.value)}
            value={quiz.question}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 1:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="option1"
            name="option1"
            onChange={onChange}
            value={quiz.option1}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 2:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="option2"
            name="option2"
            onChange={onChange}
            value={quiz.option2}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 2:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="option3"
            name="option3"
            onChange={onChange}
            value={quiz.option3}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 2:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="option4"
            name="option4"
            onChange={onChange}
            value={quiz.option4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Answer:
          </label>
          {incorrectAnswers.map((answer, index) => (
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="answer"
              name="answer"
              onChange={onChange}
              value={quiz.answer}
              required
            />
          ))}
        </div>
      {/* </form> */}

      <button
        type="submit"
        className="px-8 py-2 w-60 text-white rounded-md bg-red-600 hover:shadow-lg"
        onClick={saveQuiz}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default DashboardNewQuiz;
