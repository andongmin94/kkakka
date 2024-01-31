import LiveContentCarousel from "@/components/main/LiveContentCarousel";
import NewDogam from "@/components/main/NewDogam";

export default function IndexPage() {
  return (
    <div>
      <div className="text-3xl mb-0 flex">
        <img src="/image/playing.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2 font-bold">라이브</p>
      </div>
      <div className="h-[100px] w-[1200px] flex flex-col items-center">
        {/* <LiveContentCarousel /> */}
      </div>
      <div className="text-3xl mt-[300px] mb-1 flex ">
        <p className="grid place-items-center ml-2 font-bold">
          새로 올라온 도감
        </p>
      </div>
      <div className="flex flex-col items-center">
        {/* 도감 리스트 */}
        <NewDogam />
      </div>
    </div>
  );
}
