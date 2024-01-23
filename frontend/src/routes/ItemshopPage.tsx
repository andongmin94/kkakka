import WriteAlias from "@/components/itemShop/WriteAlias";
import DeleteCollection from "@/components/itemShop/DeleteCollection";
import Compliment from "@/components/itemShop/Compliment";
import Speaker from "@/components/itemShop/Speaker";

export default function ItemshopPage() {
  return (
    <>
      <div className="text-3xl mb-10 flex">
        <img src="/image/itemShop.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2 font-bold">아이템샵</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 row-auto w-[900px] h-[900px]">
          <div className="flex flex-col items-center">
            <WriteAlias />
          </div>
          <div className="flex flex-col items-center">
            <DeleteCollection />
          </div>
          <div className="flex flex-col items-center">
            <Compliment />
          </div>
          <div className="flex flex-col items-center">
            <Speaker />
          </div>
        </div>
      </div>
    </>
  );
}
