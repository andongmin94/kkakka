import React from "react";

import Lottie from "react-lottie-player";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

// npm install --save react-lottie-player
import lottieJson from "../../public/live.json";

export default function Live() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 120, height: 60 }}
    />
  );
}
