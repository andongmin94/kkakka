import { useMutation } from "@tanstack/react-query";

import { useBroadcastStore } from "@/stores/BroadcastStore";

import { useShallow } from "zustand/react/shallow";

// const { createBet } = useBroadcastStore(
//   useShallow((state) => ({
//     createBet: state.createBet,
//   }))
// );

// const useBetPost = () => {
//   return useMutation(createBet, {});
// };

// export default useBetPost;
