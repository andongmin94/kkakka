import { useParams } from "react-router-dom";
import { Mobile, PC } from "@/components/MediaQuery";
import Collection from "@/components/profile/Collection";
import AddCollection from "@/components/profile/AddCollection";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileDogamType } from "@/types/dogamTypes";
import { UserType } from "@/types/userTypes";

export default function ProfileCollection() {
  const params = useParams();
  const token = localStorage.getItem("token");

  // 백 api 미완
  const [profileDogams, setProfileDogams] = useState<ProfileDogamType[] | null>(
    null
  );
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/dogam?user-id=${
          params.id
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setProfileDogams(res.data.data);
      });
  }, []);

  const [myData, setMyData] = useState<UserType | null>(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMyData(res.data.data);
      });
  }, []);

  return (
    <>
      <PC>
        <div className="w-[1000px] m-1 grid grid-cols-3 row-auto place-items-center">
          {profileDogams &&
            Array.isArray(profileDogams) &&
            profileDogams.map((dogam, idx) => {
              return <Collection dogam={dogam} key={idx} />;
            })}
        </div>
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
        <div className="flex justify-center mb-2 fixed bottom-0 left-5">
          {Number(params.id) != (myData && myData.userId) ? (
            <AddCollection userId={Number(params.id)} />
          ) : null}
        </div>
      </PC>

      {/* ----------------------------------------------------- */}

      <Mobile>
        <div className="w-full my-10 grid grid-cols-1 row-auto place-items-center">
          {profileDogams &&
            Array.isArray(profileDogams) &&
            profileDogams.map((dogam, idx) => {
              return <Collection dogam={dogam} key={idx} />;
            })}
        </div>
        {/* 자기 프로필이 아닐때만 도감 추가 가능하게 */}
        <div className="flex justify-center mb-2 fixed bottom-1 right-20">
          {Number(params.id) != (myData && myData.userId) ? (
            <AddCollection userId={Number(params.id)} />
          ) : null}
        </div>
      </Mobile>
    </>
  );
}

// // 유저 임시 아이디
// const userId = "2";

// // 도감 갯수 임시 데이터
// const profileDogams = [
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
//   {
//     dogamImg: "asdfasdf",
//     dogamTitle: "냠냠",
//     createdAt: "2020-01-01 00:00:00",
//     dogamHateAmount: 100,
//     isHated: false,
//   },
// ];
