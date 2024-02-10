import { addProfileDogam } from "@/services/profile/profileDogamDataApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface addDogamDataType {
  imgUrl: string;
  dogamTitle: string;
}

export const useAddDogamPost = (userId: number, data: addDogamDataType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addProfileDogam(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileDogamFeed", userId] });
      window.alert("도감이 추가되었습니다.");
    },
    onError: () => {
      window.alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("도감 추가 실패");
    },
  });

  return mutation;
};
