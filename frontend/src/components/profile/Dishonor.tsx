import { Mobile, PC } from "../MediaQuery";
import DishonorAlias from "./DishonorAlias";
import { AliasType } from "@/types/aliasTypes";

export default function Dishonor({ data }: { data: AliasType }) {
  return (
    <>
      <PC>
        <div className="h-[150px] w-[320px] mt-5 flex flex-col justify-center">
          <div className="self-center mb-6">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className=" text-center font-bold">{data.createAt}</div>
          <div className="text-center font-bold">{data.creator}</div>
        </div>
      </PC>

      {/* ---------------------------------------------------------------------- */}

      <Mobile>
        <div className="h-[150px] w-[320px] mt-5 flex flex-col justify-center">
          <div className="self-center mb-6">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className=" text-center font-bold">{data.createAt}</div>
          <div className="text-center font-bold">{data.creator}</div>
        </div>
      </Mobile>
    </>
  );
}
