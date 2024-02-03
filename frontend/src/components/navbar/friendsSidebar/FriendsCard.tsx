import UserName from "./UserName";
import UserStatus from "./UserStatus";
import FriendsProfile from "./FriendsProfile";
import classes from "./FriendsCard.module.css";
import UserCurrentAlias from "../../UserCurrentAlias";
import { FriendType } from "@/types/friendTypes";

export default function FriendsCard({ info }: { info: FriendType }) {
  return (
    <div className={classes.card}>
      <FriendsProfile image={info.profileImg} />
      <div className={classes.textWrapper}>
        <UserCurrentAlias alias={info.curAlias} />
        <UserName name={info.name} />
        <UserStatus status={info.state} />
      </div>
    </div>
  );
}
