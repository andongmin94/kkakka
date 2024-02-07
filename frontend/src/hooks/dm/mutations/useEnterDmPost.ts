import { enterDmPost } from "@/services/dm/enterDmPostApi";
import { useMutation } from "@tanstack/react-query";

export const useEnterDmPost = () => {
  const mutation = useMutation({
    mutationFn: (data: string) => enterDmPost(data),
  });

  return mutation;
};
