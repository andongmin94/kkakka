// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
// npm install --save react-lottie-player
import lottieJson from "@/live.json";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

export default function Live() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 80, height: 40 }}
    />
  );
}
