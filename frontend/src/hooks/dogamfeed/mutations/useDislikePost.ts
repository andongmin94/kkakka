import { dislikeDogam } from "@/services/dogamfeed/changeDislikeApi";
import { useMutation } from "@tanstack/react-query";

export const useDislikeDogam = () => {
  const dislikeDogamMutation = useMutation({
    mutationFn: (dogamId: number) => dislikeDogam(dogamId),
    onSuccess: (res) => {
      console.log("도감싫어요 잘눌렸다", res);
    },
  });

  return dislikeDogamMutation;
};
