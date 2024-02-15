import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center "
      style={{
        backgroundImage: `url(https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className=" bg-white h-[250px] w-[400px]  rounded-xl flex flex-col items-center dark:bg-black ">
        <div className="flex flex-col items-center mt-10">
          <h1 className=" font-bold text-xl mb-2 dark:text-white">
            404 Not Found
          </h1>
          <div className="flex items-center my-5">
            <img
              src="/icons/icon-72x72.png"
              alt=""
              className="h-[72px] w-[72px]"
            />
            <p className="ml-2"> 페이지를 찾을 수 없어요.</p>
          </div>
          <Link
            to="/main"
            className="bg-blue-400 rounded-md text-white text-md shadow-md lg:hover:scale-105 transition-transform ease-in-out duration-500"
          >
            <Button className="">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
