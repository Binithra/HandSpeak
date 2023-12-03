import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getAllQuiz, getAllUsers} from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import QuizCard from "./QuizCard";
import { ws1, ws3, ws5 } from "../assets/img/index";

const Quiz = ({ data }) => {
  const [{ allquiz, allUsers }, dispatch] = useStateValue();
  const [showScore, setShowScore] = useState(true);
  const [score, setScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleAnswerSelection = () => {
    setScore((prevScore) => prevScore + 10);
  };

  useEffect(() => {
    // Fetch all quizzes only if not already fetched
    if (!allquiz) {
      getAllQuiz().then((data) => {
        dispatch({
          type: actionType.SET_ALL_QUIZ,
          allquiz: data.quiz,
        });
      });
    }
  }, [allquiz, dispatch]);

  useEffect(() => {
    // Fetch all quizzes only if not already fetched
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, [allUsers, dispatch]);  

  const startQuiz = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (score > 90 && !emailSent) {
      sendCertificateEmail();
      setEmailSent(true); 
    }
  }, [score, emailSent]);

  const sendCertificateEmail = (userId) => {
    // Check if allUsers is defined
    if (allUsers) {
      const user = allUsers.find((user) => user.id === userId);
  
      // Check if user and user email are defined
      if (user && user.email) {
        fetch("http://localhost:4000/api/email/sendCertificateEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, score }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      } else {
        console.error("User email is not defined");
      }
    }
  };
  

  return (
    <div className="w-full h-full pb-10 flex flex-col bg-purple-100">
      <Header />

      {!isReady && (
        <div className="flex flex-col">
          <p className=" text-base text-justify p-8 text-gray-700  ml-4">
            <li>
              ප්‍රශ්නාවලිය ආරම්භ කිරීමෙන් පසු ලබා දී ඇති පිළිතුරු ලැයිස්තුවෙන්
              නිවැරදි පිළිතුර තෝරන්න.
            </li>
            <li>
              ඔබ ප්‍රශ්නාවලිය සඳහා <b> ලකුණු 90 ට වඩා </b> ලබා ගන්නේ නම්, අපි
              ඔබේ පාඨමාලාව අවසන් කිරීමේ සහතිකය සමඟ විද්‍යුත් තැපෑලක් එවන්නෙමු.
            </li>
            <li>
              ඔබට ලකුණු 90 ට වඩා අඩු නම්, ඔබට ප්‍රශ්නාවලිය නැවත උත්සාහ කළ හැකිය.
            </li>
            <li>ඔබට සුභ පැතුම්!</li>
          </p>
          <p className=" flex text-2xl items-center justify-center font-semibold p-8 text-gray-700 ">
            ඔබ ප්‍රශ්නාවලිය ආරම්භ කිරීමට සූදානම්ද?
            <button
              className="flex ml-12 px-8 py-4 rounded-lg text-xl bg-purple-700 border-red-400 border-2 text-white"
              onClick={startQuiz}
            >
              ඔව්
            </button>
          </p>

          <div className="flex ml-64 gap-12 mt-6 ">
            <img src={ws1} className=" shadow-md h-72 rounded-lg"></img>
            <img src={ws3} className=" shadow-md h-72 rounded-lg"></img>
            <img src={ws5} className="shadow-md h-72 rounded-lg"></img>
          </div>
        </div>
      )}

      {isReady && (
        <>
          <div className="flex items-center justify-center text-2xl font-semibold p-8 align-center">
            ප්‍රශ්නාවලි සම්පූර්ණ කරමු
          </div>
          <QuizCardContainer
            data={allquiz}
            handleAnswerSelection={handleAnswerSelection}
            setScore={setScore}
          />
          <div
            className={
              showScore
                ? "d-flex flex items-center justify-center text-red-800 font-semibold rounded-lg bg-purple-300 h-14 text-3xl mt-6"
                : "d-none"
            }
          >
            ඔබේ ලකුණු : {score}
          </div>
          <div className=" mt-12  items-center justify-center">
            {score <= 90 && (
              <a
                href="/Quiz"
                className="w-24 bg-orange-300 p-4 rounded-lg ml-8"
              >
                නැවත කරන්න
              </a>
            )}
            {score > 90 && (
              <p className=" flex w-auto  items-center justify-center bg-success p-4 rounded-lg">
                සුභ පැතුම් 🥳🎉!! දැන් ඔබට ඔබේ විද්‍යුත් තැපැල් ලිපිනය සඳහා
                පාඨමාලා සම්පූර්ණ කිරීමේ සහතිකයක් ලැබෙනු ඇත.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const QuizCardContainer = ({
  data,
  handleAnswerSelection,
  setScore,
}) => {
  const [isDelete, setIsDelete] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className=" flex flex-wrap gap-3 items-center justify-evenly">
      {Array.isArray(data) &&
        data.map((quiz, i) => (
          <QuizCard
            key={quiz._id}
            data={quiz}
            index={i}
            handleAnswerSelection={handleAnswerSelection}
            setScore={setScore}
            // handleOptionChange={handleOptionChange}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
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
        ))}
    </div>
  );
};

export default Quiz;
