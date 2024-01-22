import Message from "../components/message/Message";

export default function MessagePage() {
  // 더미 데이터
  const messagesInfo = [
    {
      name: "***",
      alias: "인의동손잭스",
      status: "플레이 중",
      lastMessage: "옥상으로 따라 와",
      unreadMessages: 99,
      updatedAt: "2021-10-10 10:10:10",
    },
    {
      name: "***",
      alias: "냥냥펀치냥냥",
      status: "플레이 중",
      lastMessage: "옥상으로 따라 와",
      unreadMessages: 99,
      updatedAt: "2021-10-10 10:10:10",
    },
    {
      name: "***",
      alias: "******",
      status: "플레이 중",
      lastMessage: "옥상으로 따라 와",
      unreadMessages: 99,
      updatedAt: "2021-10-10 10:10:10",
    },
  ];
  return (
    <>
      {messagesInfo.map((messageInfo, index) => (
        <Message key={index} messageInfo={messageInfo} />
      ))}
    </>
  );
}
