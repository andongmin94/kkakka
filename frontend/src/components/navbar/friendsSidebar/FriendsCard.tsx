import classes from "./FriendsCard.module.css";
import FriendsProfile from "./FriendsProfile";
import UserCurrentAlias from "../../UserCurrentAlias";
import UserName from "./UserName";
import UserStatus from "./UserStatus";

interface info {
  name: string;
  alias: string;
  status: string;
  image: string;
}

export default function FriendsCard({ info }: { info: info }) {
  return (
    <div className={classes.card}>
      <FriendsProfile image={info.image} />
      <div className={classes.textWrapper}>
        <UserCurrentAlias alias={info.alias} />
        <UserName name={info.name} />
        <UserStatus status={info.status} />
      </div>
    </div>
  );
}
