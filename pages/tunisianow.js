import Heading from "../components/Heading";
import PieChart from "../components/Shapes/PieChart";
import Head from "next/head";

import styles from "../styles/tunisianow.module.css";

export default function Tunisianow() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tunisia State | The New Tunisia</title>
        <meta
          name="description"
          content="Discover tunisia in our way, the new tunisia developer community"
        />
      </Head>

      <Heading size={1}>Tunisia Recent Data</Heading>
      {/* <Heading size={2}>
        We are using and analysing data and for having clear idea of which path
        we go on.
      </Heading>
      <p>Knowing the issues inside sectors</p> */}

      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </div>
  );
}
