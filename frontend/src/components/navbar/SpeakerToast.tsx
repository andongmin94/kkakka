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
    <div>
      <p>{text}</p>
    </div>
  );
}