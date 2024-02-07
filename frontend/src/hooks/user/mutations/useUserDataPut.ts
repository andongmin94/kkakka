import { updateUserData } from "@/services/user/api";
import { useMutation } from "@tanstack/react-query";

interface UserData {
  userName: string;
  userProfileImg: string;
  userBackImg: string;
  userAlias: string;
  riotId: string;
}

export const useUserDataPut = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Partial<UserData> }) =>
      updateUserData({ data }),
  });

  return mutation;
};
