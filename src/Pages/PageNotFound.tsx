import React from "react";
import ErrorImage from "../Assets/Images/Leonardo_Phoenix_A_bright_yellow_error_sign_with_a_bold_sansse_3.jpg";
import BackgroundImage from "../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_1 (1).jpg"; // Import your background image

const PageNotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-lg text-center">
        <img
          src={ErrorImage} // Error image
          alt="Error"
          className="mx-auto mb-8"
        />
        <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
          onClick={() => (window.location.href = "/")} // Replace '/' with your home route
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
