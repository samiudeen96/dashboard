import React from "react";

const GoogleLoginButton = () => {
  // Redirect user to your backend OAuth login endpoint
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoogleLogin}
        className="shadow gap-2 flex py-[10px] px-4 rounded-sm items-center text-black text-sm"
      >
        <div>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
        </div>

        <div>
          Google
        </div>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
