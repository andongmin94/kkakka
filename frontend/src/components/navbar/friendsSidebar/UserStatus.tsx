import classes from "./UserStatus.module.css";

export default function UserStatus({ status } : { status: string }) {
  return (
    <>
      <div className={classes.text}>{status}</div>
    </>
  );
}
