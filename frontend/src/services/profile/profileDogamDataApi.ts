import { axiosInstance } from "@/utils/axios";
import { ProfileDogamType } from "@/types/dogamTypes";

interface PageData {
  results: ProfileDogamType[];
  nextPageParam: number;
  theLastPage: number;
}

export const fetchProfileDogamList = async (
  userId: number,
  pageParam: number
): Promise<PageData> => {
  const res = await axiosInstance.get(
    `/api/friends/dogam/users/${userId}?page=${pageParam}&size=5`
  );

  const data = {
    results: res.data.data.data,
    nextPageParam: res.data.data.currentPage + 1,
    theLastPage: res.data.data.totalPages,
  };

  return data;
};

export const addProfileDogam = async (userId: number, data: any) => {
  const formData = new FormData();
  formData.append("imgUrl", data.imgUrl);
  formData.append("dogamTitle", data.dogamTitle);
  const res = await axiosInstance.post(
    `/api/friends/dogam?friend-user-id=${userId}`
  );
  console.log(res);

  return res;
};
