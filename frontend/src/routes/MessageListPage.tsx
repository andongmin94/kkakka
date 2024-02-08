import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
import { DmType } from "@/types/dmTypes";
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
  login: boolean;
  roomId: number;
  tenMinute: boolean;
  unreadMessageCnt: number;
}

export default function MessageListPage() {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const [friendsInfo, setFriendsInfo] = useState(null);
  const [roomId, setRoomId] = useState(0);

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
        // console.log(res.data.data);
        setDmList(res.data.data);
      });
  }, []);

  const enterChatHandler = (roomId: number) => {
    // axios
    //   .post(
    //     `${import.meta.env.VITE_API_BASE_URL}/api/friends/dm/enter/${friendId}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     navigate(`/main/message/${res.data.data}`, { state: friendsInfo }); // 아직 없는듯
    //   });

    navigate(`/main/message/${roomId}`, { state: friendsInfo });
  };

  return (
    <div>
      <div>메시지 목록</div>
      {dmList &&
        dmList.map((dm, idx) => {
          axios
            .get(
              `${import.meta.env.VITE_API_BASE_URL}/api/users/data/${
                dm.friendId
              }`,
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              // console.log(res.data.data);
              setFriendsInfo(res.data.data);
            });

          return (
            <div
              key={idx}
              onClick={() => {
                enterChatHandler(dm.roomId);
              }}
            >
              <Message dm={dm} />
            </div>
          );
        })}
    </div>
  );
}
