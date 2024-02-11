import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
// import { DmType } from "@/types/dmTypes";
import axios from "axios";
import "./Chat.css";

interface dmProps {
  chatRoomType: string;
  friendAlias: string;
  friendEmail: string;
  friendId: number;
  friendImgUrl: string;
  friendName: string;
  lastMessage: string;
  lastWrittenMessageTime: Date;
  state: string;
  roomId: number;
  tenMinute: boolean;
  unreadMessageCnt: number;
}

export default function MessageListPage() {
  // const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const [friendsInfo, setFriendsInfo] = useState(null);
  const [roomId, setRoomId] = useState(0);

  const [dmList, setDmList] = useState<dmProps[] | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("메세지함");
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dm`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDmList(res.data.data);
        console.log(dmList);
      });
  }, []);

  const enterChatHandler = (friendId: number) => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data/${friendId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("정보");

        setFriendsInfo(res.data.data);
        console.log(friendsInfo);
        // navigate(`/main/message/${roomId}`, { state: friendsInfo });
      });
  };

  useEffect(() => {
    if (friendsInfo) {
      console.log("정보", friendsInfo);
      navigate(`/main/message/${roomId}`, { state: friendsInfo });
    }
  }, [friendsInfo, navigate]);

  return (
    <div>
      <div>메시지 목록</div>
      {dmList &&
        dmList.map((dm) => {
          return (
            <div
              key={dm.friendEmail}
              onClick={() => {
                setRoomId(dm.roomId);
                enterChatHandler(dm.friendId);
              }}
            >
              <Message dm={dm} />
            </div>
          );
        })}
    </div>
  );
}
