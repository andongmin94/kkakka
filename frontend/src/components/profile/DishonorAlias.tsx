import classes from "./DishonorAlias.module.css";

export default function DishonorAlias({ alias }: { alias: string }) {
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
