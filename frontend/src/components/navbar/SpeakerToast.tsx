import { useEffect } from "react";

export default function SpeakerToast({
  setToast, text 
} : {
  setToast: Function, text: string
}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="inline-flex align-middle">
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Winking%20Face%20with%20Tongue.png" width="50" height="50"/>
      <h1 className="text-2xl font-bold ml-2">{text}</h1>
    </div>
  );
}