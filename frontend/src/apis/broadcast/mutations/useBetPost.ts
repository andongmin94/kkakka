import { useMutation } from "@tanstack/react-query";
// import {} from "@/stores/AuthStore";
import { useBroadcastStore } from "@/stores/BroadcastStore";
// import {} from "@/stores/DmStore";
// import {} from "@/stores/ItemshopStore";
// import {} from "@/stores/MainStore";
// import {} from "@/stores/ProfileStore";
import { useShallow } from "zustand/react/shallow";

const { createBet } = useBroadcastStore(
  useShallow((state) => ({
    createBet: state.createBet,
  }))
);

const useBetPost = () => {
  return useMutation(createBet, {});
};

export default useBetPost;
