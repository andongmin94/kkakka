import classes from "./UserStatus.module.css";

export default function UserStatus({ status }) {
  return (
    <>
      <div className={classes.text}>{status}</div>
    </>
  );
}
