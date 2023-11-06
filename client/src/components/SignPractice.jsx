import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Webcam from "react-webcam";
import axios from "axios";

const SignPractice = () => {
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("අ");
  const [defaultValue, setDefaultValue] = useState("");

  let model,
    webcam,
    ctx,
    labelContainer,
    maxPredictions,
    highestPredictionIndex;

  useEffect(() => {
    return () => {
      if (webcam) {
        webcam.stop();
      }
    };
  }, [webcam]);

  const webcamRef = useRef(null);

  const capture = () => {
    const binaryData = webcamRef.current.getScreenshot();

    sendFrameToServer(binaryData);
  };

  const [processedImage, setProcessedImage] = useState("");

  const sendFrameToServer = async (base64EncodedFrame) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        data: base64EncodedFrame,
      });
      console.log(response.data);
      setProcessedImage(response.data.processedImage);
      setDefaultValue(response.data.letter);
    } catch (error) {
      console.error(error);
    }
  };


  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     const binaryData = webcamRef.current.getScreenshot();

  //     sendFrameToServer(binaryData);
  //   }, 1000);

  //   return () => clearInterval(timerId);
  // }, []);

  const handleButtonClick = (letter) => {
    setSelectedLetter(letter);
    const timerId = setInterval(() => {
      if (webcamRef.current != null) {
        const binaryData = webcamRef.current.getScreenshot();
        sendFrameToServer(binaryData);
      }
    }, 1000);
  };

  const dictionary = {
    අ: "අම්මා, අත, අයියා, අහිමි, අපි, අදහස",
    ආ: "ආහාර, ආගම, ආයුබෝවන්, ආකාර, ආතතිය, ඇය ",
    ඉ:"ඉලක්ක, ඉහළ, ඉඩම, ඉරිදා",
    උ:"උගත්, උඩ, උත්සාහ, උදවු ",
    එ:"එක, එළිය, එන්න, එක්සත්, එළවළු, එළුවා",
    ඒ:"ඒදන්ඩ, ඒක",
    ක:"කන්න, කපටි, කතුර",
    ග:"ගයනවා, ගල, ගන්නවා, ගස් ",
    ඩ:"යකඩ, වඩේ, කඩය, උඩ, පාඩම ",
    ත:"අත, වත, හත, ගීතය, තරුණ",
    ද:"දහය, ඉරිදා, අද, දන්නේ, අදහස",
    ප:"පන්තිය, පසු, පනහ, ජපන්",
    බ:"බල්ලෙක්, බහින, සබන්, බස්",
    ය:"චිත්‍රපටය, යටතේ, කුඩය, ගීතය",
    ර:"වසර, රතු, රට, සමහර",
    ල:"බෝල, මිල, මල, වහල, ඊලඟ, දැකල ",
    ව:"ශාලාව, ශ්‍රී ලංකාව, ඇමරිකාව, දිව ",
    ස:"සතුට, සහ, සටන, සමහර, අදහස",
    හ:"හමුවීම, හඬ, සමහර, හරි, වහන්න ",
    ෆ:"ෆලූඩා, ෆැක්ස්, ජිරාෆ්",
    ළ:"ළමුන්, කළමනාකරු",
    o:"අo",
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="flex flex-wrap">
        {[
          "අ",
          "ආ",
          "ඉ",
          "උ",
          "එ",
          "ඒ",
          "ක",
          "ග",
          "ඩ",
          "ත",
          "ද",
          "ප",
          "බ",
          "ය",
          "ර",
          "ල",
          "ව",
          "ස",
          "හ",
          "ෆ",
          "ළ",
          "o",
        ].map((letter) => (
          <button
            key={letter}
            onClick={() => handleButtonClick(letter)}
            className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="flex flex-row w-full h-full p-2 gap-1 bg-primary  ">
        {/* <div className="bg-red basis-1/2 "> */}
        {/* <button
            type="button"
            className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
            onClick={init1}
          >
            Colors
          </button>
          <button
            type="button"
            className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
            onClick={init2}
          >
            Numbers
          </button>
          <button
            type="button"
            className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
            onClick={init3}
          >
            People
          </button>
          {webcamOpen && (
            <button
              type="button"
              className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
              onClick={closeWebcam}
            >
              Close Webcam
            </button>
          )} */}

        <div className=" flex-col items-center justify-center">
          <p className="text-3xl text-black text bg-yellow-500 rounded-lg font-semibold p-4 ">
            {selectedLetter} අකුර පුරුදු වෙමු
          </p>
          <p className="text-2xl font-medium p-4 text-teal-700 ">
          අකුරට සම්බන්ධ වචන: {dictionary[selectedLetter]}
          </p>
        </div>
        <div className="col_6">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />

          {processedImage && (
            <img
              src={`data:image/png;base64,${processedImage}`}
              alt="Processed"
            />
          )}
        </div>
        <div className="flex-col items-center justify-center">
          {selectedLetter == defaultValue ? (
            <div>
              <p className="text-xl font-medium p-4 text-teal-700 "> {selectedLetter} අකුර ඉගෙනීම</p>
              <p className="text-xl font-medium p-4 text-teal-700 pb-60 ">සමත්</p>
            </div>
          ) : (
            <p className="text-xl font-medium p-4 text-teal-700 pb-60 ">අපි නැවත උත්සාහ කරමු</p>
          )}
        
        <div className="flex-col text-base font-semibold">
          <p>ඔබේ අත් ස්ථාවරව තබා ගන්න. </p>ඔබේ දෑත් කැමරාව වෙත යොමු කරන්න.
        </div>
        </div>

        {/* 
          <div id="webcam-container"></div>
          <div id="label-container"></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SignPractice;
