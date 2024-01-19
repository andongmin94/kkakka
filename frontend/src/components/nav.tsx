import classes from "./nav.module.css";

export default function Nav() {
  return (
    <>
      <div className={classes.container}>
        <section className={classes.side}>sad</section>
        <nav className={classes.nav}>
          <img className={classes.image} src="/image/logo.png" />
        </nav>
      </div>
      <main className={classes.body}></main>
    </>
  );
}
