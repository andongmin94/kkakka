import MessagePeek from "./MessagePeek";
import UnreadMessages from "./UnreadMessages";
import UserName from "../navbar/friendsSidebar/UserName";
import UserStatus from "../navbar/friendsSidebar/UserStatus";
import UserCurrentAlias from "../UserCurrentAlias";
import MessageProfile from "./MessageProfile";
import classes from "./Message.module.css";
import MessageUpdatedAt from "./MessageUpdatedAt";

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
  roomId: string;
  tenMinute: boolean;
  unreadMessageCnt: number;
}

export default function Message({ dm }: { dm: dmProps }) {
  return (
    <>
      <div className={classes.wrapper}>
        <MessageProfile />
        <div className="flex flex-col items-center">
          <UserCurrentAlias alias={dm.friendAlias} />
          <UserName name={dm.friendName} />
          <UserStatus status={dm.login} />
        </div>
        <MessagePeek lastMessage={dm.lastMessage} />
        <UnreadMessages unreadMessageNum={dm.unreadMessageCnt} />
        <MessageUpdatedAt updatedAt={dm.unreadMessageCnt} />
      </div>
    </>
  );
}
