import styles from "./AppFooter.module.css";
function AppFooter() {
  return (
    <>
      <footer className={styles.footer}></footer>
      <p className={styles.coperight}>
        &copy; {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </>
  );
}

export default AppFooter;
