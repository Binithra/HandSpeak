import React from "react";
import { NavLink } from "react-router-dom";

const quiz1 = (
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLSdy925I_UGyDMHxgg4LC2ZJwkpyyuSkk1Wtq6sQYRZEW97cdw/viewform?embedded=true"
    width="700"
    height="500"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  >
    Loading…
  </iframe>
);

const quiz2 = (
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLSeqUuP1zFgNfEE0iC_Khj2i2_uO2Y9PReIGmGcK2d2pWS_EAQ/viewform?embedded=true"
    width="700"
    height="500"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  >
    Loading…
  </iframe>
);
const QuizScreen = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/Quiz"}>
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
      <div className="bg-teal-600">
        <div className="text-2xl font-semibold p-4 text-white">
          Recognize the letter
        </div>
      </div>
      {quiz1}
    </div>
  );
};

// const QuizScreen2 = () => {
//   return (
//     <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
//       <div className="navbar bg-base-100">
//         <div className="flex-1">
//           <NavLink to={"/Quiz"}>
//             <a className="btn btn-ghost normal-case text-xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 class="w-6 h-6"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
//                 />
//               </svg>
//               Back
//             </a>
//           </NavLink>
//         </div>
//         <div className="flex-none">
//           <button className="btn btn-square btn-ghost">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-5 h-5 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div className="bg-teal-600">
//         <div className="text-2xl font-semibold p-4 text-white">
//           Recognize numbers
//         </div>
//       </div>
//       {quiz1}
//     </div>
//   );
// };
export default QuizScreen;
