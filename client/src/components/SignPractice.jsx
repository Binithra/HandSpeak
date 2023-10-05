import React, { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import Header from "./Header";

const SignPractice = () => {
  // the link to your model provided by Teachable Machine export panel
  const URL = "https://teachablemachine.withgoogle.com/models/ZAmlSd_pF/";
  let model, webcam, ctx, labelContainer, maxPredictions,highestPredictionIndex;

  useEffect(() => {
    return () => {
      // Component unmount effect
      // Perform any cleanup or teardown here
      if (webcam) {
        webcam.stop();
      }
    };
  }, []);

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

 
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // Note: the pose library adds a tmPose object to your window (window.tmPose)
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      // Convenience function to setup a webcam
      // const size = 200;
      const flip = true; // whether to flip the webcam
      webcam = new tmPose.Webcam(200, 200, flip); // width, height, flip
      await webcam.setup(); // request access to the webcam
      await webcam.play();
      window.requestAnimationFrame(loop);

      // append/get elements to the DOM
      document.getElementById("webcam-container").appendChild(webcam.canvas);
      labelContainer = document.getElementById("label-container");
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
        if (prediction[i].probability > prediction[highestPredictionIndex].probability) {
            highestPredictionIndex = i;
        }
    }

    // Display the highest prediction
    labelContainer.innerHTML = prediction[highestPredictionIndex].className + ": " +
        prediction[highestPredictionIndex].probability.toFixed(2);

    // finally draw the poses
    //  drawPose(pose);
  }

  //  function drawPose(pose) {
  //      if (webcam.canvas) {
  //          ctx.drawImage(webcam.canvas, 0, 0);
  //          // draw the keypoints and skeleton
  //          if (pose) {
  //              const minPartConfidence = 0.5;
  //              tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
  //              tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
  //          }
  //      }
  //  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="flex flex-row w-full h-full p-5 gap-4 bg-primary items-center justify-center ">
        <div className="bg-white basis-1/2 ">
          <button
            type="button"
            className="bg-teal-700 rounded-lg px-4 py-2 text-white text-lg m-2"
            onClick={init}
          >
            Start
          </button>

          <div id="webcam-container"></div>
          <canvas id="canvas"></canvas>
          <div id="label-container"></div>
          <div id="no-webcam" style={{ display: "none" }}>
            Webcam not available
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPractice;

{
  /* <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="mockup-code items-center">
        <pre data-prefix="1">
          <code>sign detection</code>
        </pre>
        <pre data-prefix="2">
          <code>installing...</code>
        </pre>
        <pre data-prefix="3" className="bg-warning text-warning-content">
          <code>under maintenece !</code>
        </pre>
      </div>
    </div> */
}
