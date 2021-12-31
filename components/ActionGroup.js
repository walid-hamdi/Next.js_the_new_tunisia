import Button from "./Button";
import styles from "./actiongroup.module.css";

export default function Action({ children, style }) {
  return (
    <div className={styles.actions} style={style}>
      {children}
    </div>
  );
}
