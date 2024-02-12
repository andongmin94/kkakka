import UserName from "./UserName";
// import UserStatus from "./UserStatus";
import FriendsProfile from "./FriendsProfile";
import classes from "./FriendsCard.module.css";
import UserCurrentAlias from "../../UserCurrentAlias";
import { FriendType } from "@/types/friendTypes";
import { Link } from "react-router-dom";
export default function FriendsCard({ info }: { info: FriendType }) {
  return (
    <Link to={`/main/profile/${info.userId}`}>
      <div className={classes.card}>
        <div className="">
          <FriendsProfile image={info.profileImg} />
        </div>
        <div className={classes.textWrapper}>
          <UserCurrentAlias alias={info.curAlias} />
          <UserName name={info.name} />
          {/* <UserStatus status={info.state} /> */}
        </div>
      </div>
    </Link>
  );
}
