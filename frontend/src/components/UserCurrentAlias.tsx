import classes from "./UserCurrentAlias.module.css";
export default function userCurrentAlias({ alias }) {
  return (
    <>
      <div className={`${classes.aliasTag} flex justify-around`}>
        <div className={classes.aliasTagSide}></div>
        <div className={classes.innerText}>{alias}</div>
        <div className={classes.aliasTagSide}></div>
      </div>
    </>
  );
}
