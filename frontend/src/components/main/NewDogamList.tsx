import NewDogam from "@/components/main/NewDogam";
import { useEffect, useState } from "react";
import axios from "axios";
import { NewDogamType } from "@/types/dogamTypes";

export default function NewDogamList() {
  const [dogamfeedList, setDogamfeedList] = useState<NewDogamType[] | null>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDogamfeedList(res.data.data);
      });
  }, []);

  return (
    <div>
      {dogamfeedList &&
        dogamfeedList.map((data, idx) => {
          return <NewDogam data={data} key={idx} />;
        })}
    </div>
  );
}
