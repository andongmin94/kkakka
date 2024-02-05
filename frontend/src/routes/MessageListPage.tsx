import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/message/Message";
import { DmType } from "@/types/dmTypes";
import axios from "axios";

export default function MessageListPage() {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const [dmList, setDmList] = useState<DmType[] | null>(null);
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

  const enterChat = (friendId: number) => {
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
      .then(() => {
        // navigate(`/chat/${friendId}`); // 아직 없는듯
      });
  };

  return (
    <div>
      <div>메시지 목록</div>
      {dmList &&
        dmList.map((dm) => {
          <Message
            key={dm.dmId}
            onClick={() => {
              enterChat(dm.friendId);
            }}
          />;
        })}
    </div>
  );
}
