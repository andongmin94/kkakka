import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export default function MessageDetailPage({ user }) {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });

    socket.emit("joinRoom", id, (res) => {
      if (res && res.ok) {
        console.log("successfully joined", res);
      } else {
        console.log("failed to join", res);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      if (!res.ok) {
        console.log("error message", res.error);
      }
      setMessage("");
    });
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", user, (res) => {
      if (res && res.ok) {
        navigate("/messagelist");
      }
    });
  };
  return (
    <>
      <div>
        <nav>
          <Button onClick={leaveRoom}>←</Button>
          <div>{user.name}</div>
        </nav>

        <div>
          {messageList.length > 0 ? (
            <MessageContainer messageList={messageList} user={user} />
          ) : null}
        </div>
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
}
