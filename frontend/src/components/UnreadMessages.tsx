import classes from "./UnreadMessages.module.css";

export default function UnreadMessages() {
  // 임시 데이터
  const unreadMessageNum = 99;
  return (
    <>
      <div className={classes.circle}>
        <div className={classes.circleText}>{unreadMessageNum}</div>
      </div>
    </>
  );
}
