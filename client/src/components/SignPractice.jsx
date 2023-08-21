import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SignPractice = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

    // Convert canvas content to Blob
    photo.toBlob((blob) => {
      // Create a temporary object URL
      const objectURL = URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = objectURL;
      downloadLink.download = "captured-photo.jpg"; //name for the image
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();

      URL.revokeObjectURL(objectURL);
      document.body.removeChild(downloadLink);
    }, "image/jpeg");
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/Home"}>
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
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full columns-[100rem] bg-indigo-100 font-sans relative">
        <div className="text-2xl bg-indigo-500 text-center text-white p-4 ">
          අපි අකුරු ඉගෙන ගනිමු
        </div>
        <div className="relative camera">
          <div className="block text-indigo-900 pt-4 text-center font-sans font-semibold rounded">
            පියවර: ඔබේ දෑත් නිවැරදිව තිරය වෙත යොමු කිරීමට වග බලා ගන්න.
            <div className="block text-indigo-900 pt-4 text-center font-sans font-semibold rounded">
              ඔබගේ රූප බාගත කිරීමට ඔබට "Snap and download button" බොත්තම භාවිතා
              කළ හැක.
              <video
                className="max-width:80% width:80% height:full p-20"
                ref={videoRef}
              ></video>
              <button
                onClick={takePhoto}
                className="absolute bottom-8 left-8 p-8 text-2xl bg-indigo-500 text-white font-semibold rounded"
              >
                Snap and Download!
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed top-0 left-full w-full h-full flex items-center bg-white transition-all duration-400 result ${
            hasPhoto ? "hasPhoto" : ""
          }`}
        >
          <canvas ref={photoRef}></canvas>
          <button
            onClick={closePhoto}
            className="absolute bottom-8 left-8 p-4 bg-indigo-500 text-white text-2xl font-semibold rounded"
          >
            Close
          </button>
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
