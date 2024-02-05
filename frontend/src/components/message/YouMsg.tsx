interface dataProps {
  userId: string;
  name: string;
  type: string;
  content: string;
}

export default function YouMsg({ data }: { data: dataProps }) {
  return (
    <div className="max-w-[60%] m-2 p-3 rounded-2xl self-end bg-blue-300 text-white font-bold text-xl text-wrap">
      {/* 사진인지 텍스트인지 확인 */}
      {data.type === "img" ? (
        <img src={data.content} className=" rounded-2xl" />
      ) : (
        data.content
      )}
    </div>
  );
}
