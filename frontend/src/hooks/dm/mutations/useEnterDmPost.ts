import { enterDmPost } from "@/services/dm/enterDmPostApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useEnterDmPost = () => {
  const enterDmMutation = useMutation({
    mutationFn: (data: string) => enterDmPost(data),
    onSuccess: (res) => {
      console.log("dm 보내기", res);
      const navigate = useNavigate();
      navigate(`/main/message/${res}`);
    },
  });

  return enterDmMutation;
};
