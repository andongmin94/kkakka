import classes from "./NewDogamAlias.module.css";

export default function NewDogamAlias({ alias }: { alias: string | null }) {
  return (
    <>
      <div className={`${classes.aliasTag} flex justify-around drop-shadow-md`}>
        <div className={classes.aliasTagSide}></div>
        <div className={classes.innerText}>{alias}</div>
        <div className={classes.aliasTagSide}></div>
      </div>
    </>
  );
}
