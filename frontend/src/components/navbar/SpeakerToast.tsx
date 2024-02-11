import { useEffect } from "react";

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
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="fixed inset-x-0 top-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-center z-50">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto">
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  className="size-10"
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Loudspeaker.png"
                  alt="Icon"
                />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <h3 className="text-2xl text-black dark:text-white">{text}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
