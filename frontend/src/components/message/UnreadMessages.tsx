import classes from "./UnreadMessages.module.css";

export default function UnreadMessages({
  unreadMessageNum,
}: {
  unreadMessageNum: number;
}) {
  // 임시 데이터
  return (
    <>
      <div className={classes.circle}>
        <div className={classes.circleText}>
          {unreadMessageNum < 99 ? unreadMessageNum : 99}
        </div>
      </div>
    </>
  );
}
