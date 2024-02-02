import UserName from "./UserName";
import UserStatus from "./UserStatus";
import FriendsProfile from "./FriendsProfile";
import classes from "./FriendsCard.module.css";
import UserCurrentAlias from "../../UserCurrentAlias";

interface info {
  name: string;
  curAlias: string | null;
  profileImg: string;
  status: string;
  login: boolean;
}

export default function FriendsCard({ info }: { info: info }) {
  return (
    <div className={classes.card}>
      <FriendsProfile image={info.profileImg} />
      <div className={classes.textWrapper}>
        <UserCurrentAlias curAlias={info.curAlias} />
        <UserName name={info.name} />
        <UserStatus status={info.status} />
      </div>
    </div>
  );
}
