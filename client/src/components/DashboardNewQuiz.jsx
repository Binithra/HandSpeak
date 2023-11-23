import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import { getAllQuiz, saveNewQuiz } from "../api";
import { actionType } from "../context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const DashboardNewQuiz = ({ data }) => {
  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState("");
  const [question, setQuestion] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const [{ allquiz }, dispatch] = useStateValue();
  const [options, setOptions] = useState([""]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [select, setSelect] = useState("yes");
  const [quizImage, setQuizImage] = useState(null);
  const [quiz, setQuiz] = useState({
    id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
    imageURL: quizImage,
    mcq: select,
    // code: "",
  });

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
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
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
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
      setQuizImage(null);
      setIsImageLoading(false);
    });
  };

  // const onChange = (e) => {
  //   setQuiz({ ...quiz, [e.target.name]: e.target.value }); //whatever value inside the quiz object will exist as it is
  // };

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
    if (!quizImage) {
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
    } else {
      setIsImageLoading(true);

      const data = {
        title: title,
        imageURL: quizImage,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
      };

      saveNewQuiz(data).then((res) => {
        getAllQuiz().then((data) => {
          dispatch({
            type: actionType.SET_ALL_QUIZ,
            allquiz: data.quiz,
          });
        });
      });
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

      setTitle(null);
      setOption1(null);
      setOption2(null);
      setOption3(null);
      setOption4(null);
      setAnswer(null);
      setQuestion(null);
      setIsImageLoading(false);
    }
  };

  // const saveQuiz = () => {
  //   // addQuiz(
  //   //   quiz.question,
  //   //   quiz.option1,
  //   //   quiz.option2,
  //   //   quiz.option3,
  //   //   quiz.option4,
  //   //   quiz.answer,
  //   //   quiz.title,
  //   //   select,
  //   // );

  //   setQuiz({
  //     question: "",
  //     option1: "",
  //     option2: "",
  //     option3: "",
  //     option4: "",
  //     answer: "",
  //     title: "",
  //     imageURL: quizImage,
  //     mcq: select,
  //   });
  // };

  return (
    <div className="flex flex-col items-center justify-center p-2 border border-gray-300 gap-2 rounded-md">
      <input
        type="text"
        placeholder="Type Quiz Title"
        className="w-full p-3 rounded-md text-base font-regular text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        id="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <div className="bg-card backdrop-blur-md w-80 h-72 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && (<FileLoader progress={imageUploadProgress} />)}
        {!isImageLoading && (
          <>
            {!quizImage ? (
              <FileUploader
                updateState={setQuizImage}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={quizImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteFileObject(quizImage, true);
                  }}
                >
                  <MdDelete className="text-white " />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* <form onSubmit={handleSubmit} className="flex flex-row"> */}
      <form className="flex flex-row">
        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Question:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="question"
            name="question"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            required
          />
        </div>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            id="answer"
            name="answer"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            required
          />
        </div>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 1:
          </label>
          {options.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="option1"
              name="option1"
              onChange={(e) => setOption1(e.target.value)}
              value={option1}
              required
            />
          ))}
        </div>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 2:
          </label>
          {options.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="option2"
              name="option2"
              onChange={(e) => setOption2(e.target.value)}
              value={option2}
              required
            />
          ))}
        </div>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 3:
          </label>
          {options.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="option3"
              name="option3"
              onChange={(e) => setOption3(e.target.value)}
              value={option3}
              required
            />
          ))}
        </div>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700">
            Option 4:
          </label>
          {options.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="option4"
              name="option4"
              onChange={(e) => setOption4(e.target.value)}
              value={option4}
              required
            />
          ))}
        </div>

        {/* <button
          type="button"
          className="px-4 py-2 w-50 text-white rounded-md bg-teal-600 hover:shadow-lg"
          onClick={addQuestion}
        >
          Add Question
        </button> */}
      </form>

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

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-teal-700  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-teal-700 blur-xl "></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{ alertType }, dispatch] = useStateValue();

  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${(isImage = "Images")}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
          
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
        });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl ">
            <BiCloudUpload />
          </p>
          <p className="text-lg">Click to upload the image</p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={(isImage = "image/*")}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashboardNewQuiz;
