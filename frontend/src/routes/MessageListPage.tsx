import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
// import { DmType } from "@/types/dmTypes";
import axios from "axios";
import "./Chat.css";
import Loading from "@/components/app/Loading";
import { UserType } from "@/types/userTypes";

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
  const [friendsInfo, setFriendsInfo] = useState<UserType | null>(null);
  const [roomId, setRoomId] = useState(0);

  const [dmList, setDmList] = useState<dmProps[] | null>(null);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!dmList) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dm`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setDmList(res.data.data);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [dmList]);

  const enterChatHandler = (friendId: number) => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/data/${friendId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("정보", res.data);
        setFriendsInfo(res.data.data);
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
    <>
      {isLoading && <Loading />}
      <div className="ml-10 mb-4">
        <div className="mb-10 ml-2 font-bold text-lg ">메시지 목록</div>
        {dmList &&
          dmList.map((dm) => {
            return (
              <div
                key={dm.roomId}
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
    </>
  );
}
