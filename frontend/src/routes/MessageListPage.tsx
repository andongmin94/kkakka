import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
import useDmListQuery from "@/apis/dm/queries/useDmListQuery";

export default function MessageListPage() {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const { dmList, isLoading, error } = useDmListQuery();
  // 현재 500에러 발생중

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.{error.message}</div>;

  // 각 채팅방으로 이동하기
  // const enterChat = (FriendEmail, dmId) => {
  //   // enter 요청 보내기
  //   enterDm(FriendEmail); // 보내야하는데 이메일 어디서 받아와야하지
  //   navigate(`/messagedetail/${dmId}`);
  // };

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
