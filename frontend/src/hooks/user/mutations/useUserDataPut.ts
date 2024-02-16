import { updateUserData } from "@/services/user/userDataApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserData {
  userName: string;
  userProfileImg: string;
  userBackImg: string;
  userAlias: string;
  riotId: string;
}

export const useUserDataPut = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: Partial<UserData> }) =>
      updateUserData({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      console.log("수정 성공");
    },
  });

  return mutation;
};
