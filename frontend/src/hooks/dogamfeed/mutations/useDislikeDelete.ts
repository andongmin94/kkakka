import { cancelDislikeDogam } from "@/services/dogamfeed/changeDislikeApi";
import { useMutation } from "@tanstack/react-query";

export const useDislikeDeleteDogam = () => {
  const cancleDislikeDogamMutation = useMutation({
    mutationFn: (dogamId: number) => cancelDislikeDogam(dogamId),
    onSuccess: (res) => {
      console.log("도감싫어요취소 잘눌렸다", res);
    },
  });

  return cancleDislikeDogamMutation;
};
