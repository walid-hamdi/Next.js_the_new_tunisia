import Navbar from "../components/Navbar";
import styles from "../components/layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
