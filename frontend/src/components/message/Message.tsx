import MessagePeek from "./MessagePeek";
import UnreadMessages from "./UnreadMessages";
import UserName from "../navbar/friendsSidebar/UserName";
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
  state: string;
  roomId: number;
  tenMinute: boolean;
  unreadMessageCnt: number;
}

export default function Message({ dm }: { dm: dmProps }) {
  return (
    <>
      <div className={classes.wrapper}>
        <MessageProfile friendImgUrl={dm.friendImgUrl} />
        <div className="flex flex-col mr-10">
          <UserCurrentAlias alias={dm.friendAlias} />
          <div className="flex justify-center items-center">
            <UserName name={dm.friendName} />
            {/* <UserStatus login={dm.login} status={""} /> */}
          </div>
        </div>
        <div className=" col-span-3">
          <MessagePeek lastMessage={dm.lastMessage} />
        </div>
        <UnreadMessages unreadMessageNum={dm.unreadMessageCnt} />
        <MessageUpdatedAt updatedAt={dm.lastWrittenMessageTime} />
      </div>
    </>
  );
}
