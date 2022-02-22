import Heading from "../components/Heading";
import Head from "next/head";

import styles from "../styles/tunisianow.module.css";
import Container from "../components/Container";
import Chart from "../components/Shapes/Chart";
import MapTunisia from "../components/Shapes/MapTunisia";

export default function Tunisianow() {
  return (
    <>
      <Head>
        <title>Tunisia State | The New Tunisia</title>
        <meta
          name="description"
          content="Discover tunisia in our way, the new tunisia developer community"
        />
      </Head>

      <Container>
        <Heading size={1} className={styles.headingTunisia}>
          Tunisia Recent Data
        </Heading>

        <Container>
          <Heading size={3} style={{ marginLeft: "5rem" }}>
            Medical Transformation
          </Heading>
          {/* <MapTunisia /> */}
        </Container>
      </Container>
    </>
  );
}
