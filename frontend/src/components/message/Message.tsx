import MessagePeek from "./MessagePeek";
import UnreadMessages from "./UnreadMessages";
import UserName from "../navbar/friendsSidebar/UserName";
import UserStatus from "../navbar/friendsSidebar/UserStatus";
import UserCurrentAlias from "../UserCurrentAlias";
import MessageProfile from "./MessageProfile";
// import classes from "./Message.module.css";
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
      <div className="border-2 rounded-2xl mb-2 j grid grid-cols-7 space-x-5 place-items-center">
        <MessageProfile />
        <div className="flex flex-col items-center">
          <UserCurrentAlias alias={dm.friendAlias} />
          <div className="flex justify-center items-center">
            <UserName name={dm.friendName} />
            <UserStatus status={dm.state} />
          </div>
        </div>
        <div className=" col-span-3">
          <MessagePeek lastMessage={dm.lastMessage} />
        </div>
        <UnreadMessages unreadMessageNum={dm.unreadMessageCnt} />
        <MessageUpdatedAt updatedAt={dm.unreadMessageCnt} />
      </div>
    </>
  );
}
