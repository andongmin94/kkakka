import { useQuery } from "@tanstack/react-query";
import { MY_PROFILE_PIC } from "@/constants/queryKeys";
import { useMainStore } from "@/stores/MainStore";

const uesMyProfilePicQuery = () => {
  const { fetchMyProfilePic } = useMainStore();

  const {
    data: myProfilePic,
    error,
    isLoading,
  } = useQuery({
    queryKey: [MY_PROFILE_PIC],
    queryFn: fetchMyProfilePic,
  });

  return { myProfilePic, error, isLoading };
};

export default uesMyProfilePicQuery;
