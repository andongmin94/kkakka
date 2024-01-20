import LiveContentCarousel from "@/components/LiveContentCarousel";

export default function IndexPage() {
  return (
    <>
      <div className="text-3xl mb-0 flex">
        <img src="/public/image/playing.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2">라이브</p>
      </div>
      <div className="h-[100px] w-[1200px]">
        <LiveContentCarousel />
      </div>
      <div className="text-3xl mt-[300px] mb-1 flex ">
        <p className="grid place-items-center ml-2">새로 올라온 도감</p>
      </div>
      <div className="flex">
        <img src="/public/image/liveImage.png" />
      </div>
    </>
  );
}