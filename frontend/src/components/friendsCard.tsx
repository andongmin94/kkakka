import classes from "@/components/FriendsCard.module.css";
import LiveProfile from "./LiveProfile";
import UserCurrentAlias from "./UserCurrentAlias";
import UserName from "./UserName";
import UserStatus from "./UserStatus";

export default function FriendsCard() {
  return (
    <div className={classes.card}>
      <LiveProfile text={"제목 떼주세유"} />
      <div className={classes.textWrapper}>
        <UserCurrentAlias alias={"alias"} />
        <UserName name={"name"} />
        <UserStatus status={"status"} />
      </div>
    </div>
  );
}
