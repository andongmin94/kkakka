import MessagePeek from "./MessagePeek";
import UnreadMessages from "./UnreadMessages";
import UserName from "./UserName";
import UserStatus from "./UserStatus";
import UserCurrentAlias from "./UserCurrentAlias";
import LiveProfile from "./LiveProfile";
import classes from "./Message.module.css";
import MessageUpdatedAt from "./MessageUpdatedAt";

export default function Message({ messageInfo } : { messageInfo: any }) {
  return (
    <>
      <div className={classes.wrapper}>
        <LiveProfile text={"제목 떼주세유"} />
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
