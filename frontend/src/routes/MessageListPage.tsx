import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
import { DmType } from "@/types/dmTypes";
import axios from "axios";

interface dmProps {
  chatRoomType: string;
  friendAlias: string;
  friendEmail: string;
  friendId: number;
  friendImgUrl: string;
  friendName: string;
  lastMessage: string;
  lastWrittenMessageTime: Date;
  login: boolean;
  roomId: string;
  tenMinute: boolean;
  unreadMessageCnt: number;
}

export default function MessageListPage() {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const [dmList, setDmList] = useState<dmProps[] | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dm`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDmList(res.data.data);
      });
  }, []);

  const enterChatHandler = (friendId: number) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dm/enter/${friendId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        navigate(`/main/message/${res.data.data}`); // 아직 없는듯
      });
  };

  return (
    <div>
      <div>메시지 목록</div>
      {dmList &&
        dmList.map((dm, idx) => (
          <div
            key={idx}
            onClick={() => {
              enterChatHandler(dm.friendId);
            }}
          >
            <Message dm={dm} />
          </div>
        ))}
    </div>
  );
}
