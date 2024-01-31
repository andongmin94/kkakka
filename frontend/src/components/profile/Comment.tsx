import { Button } from "../ui/button";
import CommentAlias from "./CommentAlias";

interface data {
  userId: string;
  name: string;
  text: string;
  update: string;
  alias: string;
}

export default function Comment({
  data,
  userId,
}: {
  data: data;
  userId: string;
}) {
  return (
    <div className="my-2">
      <div className="flex justify-between">
        <div className="flex">
          <p className="mx-1 font-bold text-lg">{data.name}</p>
          <div className="flex items-center ml-2">
            <CommentAlias alias={data.alias} />
          </div>
          {/* 자기일때만 삭제버튼 보이게 */}
          {data.userId === userId ? (
            <div className="flex ml-2">
              <Button
                variant="destructive"
                className="w-5 h-5 self-center"
                onClick={() => {
                  // 여기서 axios 삭제 요청 보내면 될듯
                }}
              >
                삭제
              </Button>
            </div>
          ) : null}
        </div>
        <p className="mx-1">{data.update}</p>
      </div>
      <p className="border-2 w-full rounded-md px-1">{data.text}</p>
    </div>
  );
}
