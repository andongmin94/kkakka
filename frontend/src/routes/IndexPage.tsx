import NewDogamList from "@/components/main/NewDogamList";
import { Mobile, PC } from "@/components/MediaQuery";
import LiveContentCarousel from "@/components/main/LiveContentCarousel";
import { useEffect } from "react";
import useItemshopStore from "@/store/itemshop/itemshopStore";
import { useItemList } from "@/hooks/itemshop/queries/useItemListQuery";

export default function IndexPage() {
  const { setItemList } = useItemshopStore();
  const { useItemListQuery } = useItemList();
  const { data: itemListData } = useItemListQuery();

  useEffect(() => {
    if (itemListData) {
      setItemList(itemListData);
    } else {
      console.log("아이템샵 데이터없음");
    }
  }, [itemListData]);

  return (
    <>
      <PC>
        <div>
          <div className="text-3xl mb-0 flex">
            <img src="/image/playing.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] w-[1200px] flex flex-col items-center">
            <LiveContentCarousel />
          </div>
          <div className="text-3xl mt-[300px] mb-10 flex ">
            <img src="/image/dogam.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">
              새로 올라온 도감
            </p>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-y-5 mb-5 w-[1050px]">
            {/* 도감 리스트 */}
            <NewDogamList />
          </div>
        </div>
      </PC>

      {/* ------------------------------------------------------------------------------------------------ */}

      <Mobile>
        <div>
          <div className="text-3xl mb-0 flex">
            <img src="/image/playing.png" className="h-[50px] w-[50px]" />
            <p className="grid place-items-center ml-2 font-bold">라이브</p>
          </div>
          <div className="h-[100px] w-[1200px] flex flex-col items-center">
            {/* <LiveContentCarousel /> */}
          </div>
          <div className="text-3xl mt-[300px] mb-10 flex ">
            <img src="/image/dogam.png" className="h-[50px] w-[50px]" />
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
