import { useState } from "react";

interface data {
  check: boolean;
}

export default function Check({ check }: data) {
  const [ch, setCh] = useState(check);

  return (
    <div
      className="h-10= w-10 bg-white flex justify-center rounded-full"
      onClick={() => {
        setCh(!ch);
      }}
    >
      {ch ? (
        <img src="/image/check.png" className="h-10 w-10 ml-[5px]" />
      ) : (
        <img src="/image/noCheck.png" className="h-10 w-10 ml-[5px]" />
      )}
    </div>
  );
}
