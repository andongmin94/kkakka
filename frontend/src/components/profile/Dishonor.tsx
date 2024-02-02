import { Mobile, PC } from "../MediaQuery";
import DishonorAlias from "./DishonorAlias";

interface data {
  alias: string;
  name: string;
  createdAt: string;
}

export default function Dishonor({ data }: { data: data }) {
  return (
    <>
      <PC>
        <div className="h-[150px] w-[320px] mt-5 flex flex-col justify-center">
          <div className="self-center mb-6">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className=" text-center font-bold">{data.createdAt}</div>
          <div className="text-center font-bold">{data.name}</div>
        </div>
      </PC>

      {/* ---------------------------------------------------------------------- */}

      <Mobile>
        <div className="h-[150px] w-[320px] mt-5 flex flex-col justify-center">
          <div className="self-center mb-6">
            <DishonorAlias alias={data.alias} />
          </div>
          <div className=" text-center font-bold">{data.createdAt}</div>
          <div className="text-center font-bold">{data.name}</div>
        </div>
      </Mobile>
    </>
  );
}
