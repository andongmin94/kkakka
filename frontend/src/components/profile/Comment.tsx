import CommentAlias from "./CommentAlias";

interface data {
  name: string;
  text: string;
  update: string;
  alias: string;
}

export default function Comment({ data }: { data: data }) {
  return (
    <div className="my-2">
      <div className="flex justify-between">
        <div className="flex">
          <p className="mx-1 font-bold text-lg">{data.name}</p>
          <div className="flex items-center">
            <CommentAlias alias={data.alias} />
          </div>
        </div>
        <p className="mx-1">{data.update}</p>
      </div>
      <p className="border-2 w-full rounded-md px-1">{data.text}</p>
    </div>
  );
}
