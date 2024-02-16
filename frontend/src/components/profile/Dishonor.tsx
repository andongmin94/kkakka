import { Mobile, PC } from "../MediaQuery";
import DishonorAlias from "./DishonorAlias";
import { AliasType } from "@/types/aliasTypes";

export default function Dishonor({ data }: { data: AliasType }) {
  return (
    <>
      <PC>
        <div
          className={
            "my-5 flex items-center flex-col w-52 h-50 shadow-lg border-3 bg-gray-200 rounded-md"
          }
        >
          <div className="mb-6 mt-6 flex flex-col items-center w-28 h-10 rounded-lg">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className="">
            <div className="flex items-center flex-col">
              <div className="font-bold text-xs text-zinc-700">
                {data.creator}
              </div>
            </div>

            <div className="text-center font-bold text-[10px] mt-3 text-zinc-700 mb-6">
              {data.createdAt.toString().substring(0, 4)}년&nbsp;
              {data.createdAt.toString().substring(5, 7)}월&nbsp;
              {data.createdAt.toString().substring(8, 10)}일&nbsp;
            </div>
          </div>
        </div>
      </PC>

      {/* ---------------------------------------------------------------------- */}

      <Mobile>
        <div className="h-[150px] w-[320px] mt-5 flex flex-col justify-center">
          <div className="self-center mb-6">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className=" text-center font-bold">{data.createdAt}</div>
          <div className="text-center font-bold">{data.creator}</div>
        </div>
      </Mobile>
    </>
  );
}
