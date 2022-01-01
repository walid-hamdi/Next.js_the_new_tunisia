import Head from "next/head";
import Heading from "../components/Heading";

import styles from "../styles/notfound.module.css";

export default function Custom404() {
  return (
    <div className={styles.notFoundContainer}>
      <Head>
        <title>Page Not Found | The New Tunisia</title>
        <meta
          name="description"
          content="Check out our community, the new tunisia developer community"
        />
      </Head>

      <Heading size={1}>Oops!! page not found!</Heading>
    </div>
  );
}
