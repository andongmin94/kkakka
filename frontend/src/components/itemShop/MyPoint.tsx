export default function MyPoint({ point }: { point: number }) {
  return (
    <div className="flex justify-between mr-0 mb-6 ">
      <div></div>
      <div className="flex bg-slate-300 rounded-md  bg-opacity-50 px-4 py-2 items-center shadow-md">
        <div className="mr-3">💰</div>
        <div className="flex ">
          <div className="mr-1">내 포인트</div>
          <div>{point} P</div>
        </div>
      </div>
    </div>
  );
}
