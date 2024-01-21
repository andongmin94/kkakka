import Message from "../components/Message";

export default function MessagePage() {
  const messagesInfo = [
    {
      name: "김상훈",
      alias: "인의동손잭스",
      status: "플레이 중",
      lastMessage: "옥상으로 따라 와",
      unreadMessages: 99,
      updatedAt: "2021-10-10 10:10:10",
    },
    {
      name: "이수민",
      alias: "냥냥펀치냥냥",
      status: "플레이 중",
      lastMessage: "옥상으로 따라 와",
      unreadMessages: 99,
      updatedAt: "2021-10-10 10:10:10",
    },
    {
      name: "이해건",
      alias: "이해건삼해건",
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
