import MessagePeek from "./MessagePeek";
import UnreadMessages from "../UnreadMessages";
import UserName from "../navbar/friendsSidebar/UserName";
import UserStatus from "../navbar/friendsSidebar/UserStatus";
import UserCurrentAlias from "../navbar/friendsSidebar/UserCurrentAlias";
import MessageProfile from "./MessageProfile";
import classes from "./Message.module.css";
import MessageUpdatedAt from "./MessageUpdatedAt";

interface messageProps {
  name: string;
  alias: string;
  status: string;
  lastMessage: string;
  unreadMessages: number;
  updatedAt: string;
}

export default function Message({
  messageInfo,
}: {
  messageInfo: messageProps;
}) {
  return (
    <>
      <div className={classes.wrapper}>
        <MessageProfile />
        <div>
          <UserCurrentAlias alias={messageInfo.alias} />
          <UserName name={messageInfo.name} />
          <UserStatus status={messageInfo.status} />
        </div>
        <MessagePeek lastMessage={messageInfo.lastMessage} />
        <UnreadMessages />
        <MessageUpdatedAt updatedAt={messageInfo.updatedAt} />
      </div>
    </>
  );
}
