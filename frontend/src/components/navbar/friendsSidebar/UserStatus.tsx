import classes from "./UserStatus.module.css";

export default function UserStatus({ status }: { status: boolean }) {
  return (
    <div className="flex flex-row">
      {/* <div className={classes.text}>{status}</div> */}
      <div className="flex items-center ml-1">
        <div className="h-3 w-3 rounded-full bg-green-400" />
      </div>
    </div>
  );
}
