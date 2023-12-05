import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { database } from "../config/firebase.config";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(database, emailVal)
      .then(() => {
        alert("Check your email for the password reset link.");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="w-screen bg-teal-200 p-4">
        <NavLink to="/login">
          <div className="flex items-center text-black font-semibold text-xl">
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
          </div>
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Enter your email
              </label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-2 bg-teal-500 text-white rounded shadow hover:bg-teal-800 hover:shadow-md"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
