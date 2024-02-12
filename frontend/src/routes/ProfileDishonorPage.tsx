import { Mobile, PC } from "@/components/MediaQuery";
import Dishonor from "@/components/profile/Dishonor";
import { useParams } from "react-router-dom";
import useDishonorStore from "@/store/profile/dishonorStore";
import { useDishonor } from "@/hooks/profile/queries/useDishonorQuery";
import { useEffect } from "react";

export default function ProfileDishonorPage() {
  const params = useParams();
  const { useDishonorQuery } = useDishonor();
  const { aliases, setAliases } = useDishonorStore();
  const { data: aliasList, refetch } = useDishonorQuery(params.id || ""); // refetch 함수 추가

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (aliasList) {
      setAliases(aliasList);
    }
  }, [aliasList, setAliases]);

  return (
    <>
      <PC>
        <div className="m-1 grid grid-cols-3 row-auto place-items-center">
          {aliases &&
            aliases.map((data, idx) => {
              return <Dishonor data={data} key={idx} />;
            })}
        </div>
      </PC>

      {/* ------------------------------------------------ */}

      <Mobile>
        <div className="w-full m-1 grid grid-cols-2 row-auto place-items-center">
          {aliases &&
            aliases.map((data, idx) => {
              return <Dishonor data={data} key={idx} />;
            })}
        </div>
      </Mobile>
    </>
  );
}
