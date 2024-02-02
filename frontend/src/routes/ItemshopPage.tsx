import Speaker from "@/components/itemShop/Speaker";
import WriteAlias from "@/components/itemShop/WriteAlias";
import Compliment from "@/components/itemShop/Compliment";
import useItemListQuery from "@/apis/itemshop/queries/useItemListQuery";
import DeleteCollection from "@/components/itemShop/DeleteCollection";

export default function ItemshopPage() {
  const { data, isLoading, error } = useItemListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  // console.log(items[0].itemName); // 칭호지정
  // console.log(items[1].itemName); // 도감삭제
  // console.log(items[2].itemName); // 강제칭찬
  // console.log(items[3].itemName); // 확성기

  console.log(data);

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
              itemName={data[0].itemName}
              itemPrice={data[0].itemPrice}
              itemDesc={data[0].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <DeleteCollection
              itemName={data[1].itemName}
              itemPrice={data[1].itemPrice}
              itemDesc={data[1].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <Compliment
              itemName={data[2].itemName}
              itemPrice={data[2].itemPrice}
              itemDesc={data[2].itemDesc}
            />
          </div>
          <div className="flex flex-col items-center">
            <Speaker
              itemName={data[3].itemName}
              itemPrice={data[3].itemPrice}
              itemDesc={data[3].itemDesc}
            />
          </div>
        </div>
      </div>
    </>
  );
}
