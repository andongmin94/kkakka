import TitleItemshop from "@/components/title-itemshop";

export default function ItemshopPage() {
  return (
    <>
      <div className="text-3xl mb-10 flex">
        <img src="/image/playing.png" className="h-[50px] w-[50px]" />
        <p className="grid place-items-center ml-2">아이템샵</p>
      </div>
      <TitleItemshop />
    </>
  );
}
