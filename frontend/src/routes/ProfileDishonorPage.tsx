import { Mobile, PC } from "@/components/MediaQuery";
import Dishonor from "@/components/profile/Dishonor";
import axios from "axios";
import { useEffect, useState } from "react";
import { AliasType } from "@/types/aliasTypes";
import { useParams } from "react-router-dom";

export default function ProfileDishonorPage() {
  const params = useParams();
  const [aliases, setAliases] = useState<AliasType[] | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/alias?user-id=${
          params.id
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("불명예", res.data.data.aliasList);
        setAliases(res.data.data.aliasList);
      });
  }, []);

  return (
    <>
      <PC>
        <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
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
