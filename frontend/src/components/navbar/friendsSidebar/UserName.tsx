import classes from "./UserName.module.css";

export default function UserName({ name }: { name: string }) {
  return (
    <>
      <div className={classes.name}>{name}</div>
    </>
  );
}
