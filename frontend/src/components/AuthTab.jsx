import React from "react";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import IntroLottie from "./lottie/IntroLottie.jsx";
import useUiStore from "../store/uiStore.js";

const Auth = () => {
  const { tab, setTab } = useUiStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Left section: Animation */}
        <div className="flex items-center justify-center p-4">
          <div className="flex flex-col items-center w-full">
            <IntroLottie />
          </div>
        </div>

        {/* Right section: Form */}
        <div className="shadow-lg p-6 sm:p-10 rounded-md bg-white">
          {/* Tabs */}
          <div className="flex border-b gap-2 border-primary overflow-hidden pb-2">
            {tabHeader.map((item, index) => (
              <button
                key={index}
                className={`py-2 rounded flex items-center justify-center w-full border-2 border-primary ${item.name === tab
                    ? "bg-primary transition"
                    : "text-primary bg-white"
                  }`}
                onClick={() => setTab(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-4">
            {tab === "Login" && <Login />}
            {tab === "Signup" && <Register />}
          </div>
        </div>
      </div>
    </div>
  );
};

const tabHeader = [
  { name: "Login" },
  { name: "Signup" },
];

export default Auth;
