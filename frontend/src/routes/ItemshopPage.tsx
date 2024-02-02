import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import useItemListQuery from "@/apis/itemshop/queries/useItemListQuery";
import DeleteCollection from "@/components/itemShop/DeleteCollection";

export default function ItemshopPage() {
  const { items, isLoading, error } = useItemListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  // console.log(items[0].itemName); // 칭호지정
  // console.log(items[1].itemName); // 도감삭제
  // console.log(items[2].itemName); // 강제칭찬
  // console.log(items[3].itemName); // 확성기

  console.log(items);

  return (
    <>
      <div className="text-3xl mb-10 flex">
        <img src="/image/itemShop.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 row-auto w-[900px] h-[900px]">
          <div className="flex flex-col items-center">
            <WriteAlias
              itemName={items[0].itemName}
              itemPrice={items[0].itemPrice}
              itemDesc={items[0].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <DeleteCollection
              itemName={items[1].itemName}
              itemPrice={items[1].itemPrice}
              itemDesc={items[1].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <Compliment
              itemName={items[2].itemName}
              itemPrice={items[2].itemPrice}
              itemDesc={items[2].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <Speaker
              itemName={items[3].itemName}
              itemPrice={items[3].itemPrice}
              itemDesc={items[3].itemDesc}
            />
          </div>
        </div>
      </div>
    </>
  );
}
