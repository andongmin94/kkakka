interface UserType {
  name: string;
  id: number;
}

interface MessageType {
  user: UserType;
  chat: string;
  _id: number;
}

export default function MessageContainer({
  messageList,
  user,
}: {
  messageList: MessageType[];
  user: UserType;
}) {
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <div key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
