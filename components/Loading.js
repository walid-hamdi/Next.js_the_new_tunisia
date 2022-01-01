import Loader from "react-loader-spinner";
import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <Loader type="ThreeDots" color="#1a83ff" height="50" width="50" />
    </div>
  );
};
