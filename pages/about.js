import Head from "next/head";
import Heading from "../components/Heading";

import styles from "../styles/about.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | The New Tunisia</title>
        <meta
          name="description"
          content="About our communication system benefit and our mission, the new tunisia developer community"
        />
      </Head>
      <div className={styles.aboutContainer}>
        <Heading size={3}>About Us</Heading>
        <p>
          We create this platform for collaboration and communication to come up
          with new ideas
        </p>
        <p>
          That could lead to small or even big changes (Impact) in the
          administrations and the digital economy overall
        </p>
        <Heading size={3}>For who?</Heading>
        <ul>
          <li>
            <p>Developers</p>
          </li>
          <li>
            <p>Designers</p>
          </li>
          <li>
            {" "}
            <p>Data scientist</p>
          </li>

          <li>
            <p>Interested in digital transformation</p>
          </li>
        </ul>
      </div>
    </>
  );
}
