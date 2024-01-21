import classes from "./UserName.module.css";
export default function UserName({ name }) {
  return (
    <>
      <div className={classes.name}>{name}</div>
    </>
  );
}
