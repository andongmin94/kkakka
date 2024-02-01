export default function Price({ itemPrice }: { itemPrice: number }) {
  return (
    <div className="absolute top-[150px] rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white z-20 font-dnf lg:hover:scale-105 transition-transform ease-in-out duration-500">
      <div className="flex flex-row justify-content-center gap-4">
        <img src="/image/coins.png" className="h-10 w-10" />
        <span className="self-center text-2xl font-bold">{itemPrice}</span>
      </div>
    </div>
  );
}
