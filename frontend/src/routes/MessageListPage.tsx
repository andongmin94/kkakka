import * as React from "react";
import { useEffect } from "react";
import { useDmStore } from "@/stores/DmStore";
import { useNavigate } from "react-router-dom";
import Message from "../components/message/Message";

export default function MessageListPage() {
  const [position, setPosition] = React.useState("");
  const navigate = useNavigate();
  const { fetchDmList, dmList, enterDm } = useDmStore();

  useEffect(() => {
    fetchDmList();
  }, [fetchDmList]);

  console.log(dmList);

  // 각 채팅방으로 이동하기
  const enterChat = (FriendEmail, dmId) => {
    // enter 요청 보내기
    enterDm(FriendEmail); // 보내야하는데 이메일 어디서 받아와야하지
    navigate(`/messagedetail/${dmId}`);
  };

  return (
    <div>
      <div>메시지 목록</div>
      {/* {dmList &&
        dmList.length > 0 &&
        dmList.map((dmId) => {
          <Message key={dmId} onClick={() => EnterChat(dmId)} />;
        })} */}
    </div>
  );
}
