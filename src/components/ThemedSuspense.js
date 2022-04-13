import React from "react";
import Lottie from "react-lottie";
import ImageLight from "../assets/svg/loading.json";

function ThemedSuspense() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ImageLight,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full grid content-center h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <Lottie
        options={defaultOptions}
        height={80}
        width={80}
      />
    </div>
  );
}

export default ThemedSuspense;
