import NewDogamList from "@/components/main/NewDogamList";
import { Mobile, PC } from "@/components/MediaQuery";
import LiveContentCarousel from "@/components/main/LiveContentCarousel";
// import { useEffect } from "react";
// import useItemshopStore from "@/store/itemshop/itemshopStore";
// import { useItemList } from "@/hooks/itemshop/queries/useItemListQuery";

export default function IndexPage() {
  // const { setItemList } = useItemshopStore();
  // const { useItemListQuery } = useItemList();

  return (
    <>
      <PC>
        <div>
          <div className="text-lg flex">
            <p className="grid font-bold ml-10">라이브</p>
          </div>
          <div className="h-[100px] flex flex-col items-center">
            <LiveContentCarousel />
          </div>
          <div className="text-lg mt-[300px] mb-5 flex ">
            <p className="grid  ml-10 font-bold">새로 올라온 도감</p>
          </div>
          <div className="grid grid-cols-2 gap-y-5 mb-5 w-[1050px] ml-10">
            {/* 도감 리스트 */}
            <NewDogamList />
          </div>
        </div>
      </PC>

      {/* ------------------------------------------------------------------------------------------------ */}

      <Mobile>
        <div>
          <div className="text-xl mb-0 flex">
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] w-[1200px] flex flex-col items-center">
            {/* <LiveContentCarousel /> */}
          </div>
          <div className="text-xl mt-[300px] mb-10 flex ">
            <p className="grid place-items-center ml-2 font-bold">
              새로 올라온 도감
            </p>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-y-5 mb-5 w-full">
            {/* 도감 리스트 */}
            <NewDogamList />
          </div>
        </div>
      </Mobile>
    </>
  );
}
