import Navbar from "../components/Navbar";
import styles from "../components/layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.app}>{children}</div>
      </div>
    </div>
  );
}
