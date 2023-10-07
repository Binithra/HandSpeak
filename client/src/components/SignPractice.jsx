import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import Header from "./Header";

const SignPractice = () => {
  const URL1 = "https://teachablemachine.withgoogle.com/models/ZAmlSd_pF/";
  const URL2 = "https://teachablemachine.withgoogle.com/models/5m6JReaEJ/";
  const URL3 = "https://teachablemachine.withgoogle.com/models/CWCJ1zSw9/";
  const [webcamOpen, setWebcamOpen] = useState(false);

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

  async function init1() {
    const modelURL1 = URL1 + "model.json";
    const metadataURL1 = URL1 + "metadata.json";

    model = await tmPose.load(modelURL1, metadataURL1);
    maxPredictions = model.getTotalClasses();

    const flip = true; 
    webcam = new tmPose.Webcam(500, 400, flip); // width, height
    await webcam.setup(); 
    await webcam.play();
    setWebcamOpen(true);
    window.requestAnimationFrame(loop);

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = ""; 
    webcamContainer.appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    labelContainer.style.fontSize = "24px";
    labelContainer.innerHTML = ""; 
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  function closeWebcam() {
    if (webcam) {
      webcam.stop();
      setWebcamOpen(false);
    }
  }


  async function init2() {
    const modelURL2 = URL2 + "model.json";
    const metadataURL2 = URL2 + "metadata.json";

    model = await tmPose.load(modelURL2, metadataURL2);
    maxPredictions = model.getTotalClasses();

    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(500, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = ""; 
    webcamContainer.appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    labelContainer.style.fontSize = "24px";
    labelContainer.innerHTML = ""; 
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function init3() {
    const modelURL3 = URL3 + "model.json";
    const metadataURL3 = URL3 + "metadata.json";

    model = await tmPose.load(modelURL3, metadataURL3);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmPose.Webcam(500, 400, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.innerHTML = ""; 
    webcamContainer.appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    labelContainer.style.fontSize = "24px";
    labelContainer.innerHTML = ""; 
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop(timestamp) {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    highestPredictionIndex = 0;
    for (let i = 1; i < maxPredictions; i++) {
      if (
        prediction[i].probability >
        prediction[highestPredictionIndex].probability
      ) {
        highestPredictionIndex = i;
      }
    }

    // Display the highest prediction
    labelContainer.innerHTML =
      prediction[highestPredictionIndex].className +
      ": " +
      prediction[highestPredictionIndex].probability.toFixed(2);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="text-2xl font-semibold p-2 ">පුහුණු වීමට මාතෘකාවක් තෝරා ගනිමු</div>
      <div className="flex flex-row w-full h-full p-5 gap-4 bg-primary items-center justify-center ">
        <div className="bg-red basis-1/2 ">
          <button
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
          )}

          <div id="webcam-container"></div>
          <div id="label-container"></div>
        </div>
      </div>
    </div>
  );
};

export default SignPractice;
