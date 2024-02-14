import { useEffect } from "react";
import classes from "./SpeakerToast.module.css";

export default function SpeakerToast({
  setToast,
  text,
}: {
  setToast: Function;
  text: string;
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
    <div className="fixed inset-x-0 top-0 flex items-end justify-center px-6 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-center z-50 ">
      <div className="bg-opacity-20 bg-gradient-to-br from-red-200 via-pink-200 to-purple-300 dark:bg-gray-800 shadow-lg pointer-events-auto py-5 px-2 rounded-full">
        <div className="flex-shrink-0 flex justify-center  itmes-center mx-2">
          <img
            className={`${classes.iconAnimation} `}
            src="/image/Loudspeaker.png"
            alt="Icon"
          />
          <h3
            className={`font-bold text-zinc-800 dark:text-white ${classes.fontAnimation} mx-3`}
          >
            {text}
          </h3>
          <img
            className={`${classes.iconAnimation} transform scale-x-[-1]`}
            src="/image/Loudspeaker.png"
            alt="Icon"
          />
        </div>
      </div>
    </div>
  );
}
