import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Heading from "../components/Heading";
import styles from "../styles/home.module.css";

import Container from "../components/Container";
import { motion } from "framer-motion";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>The New Tunisia</title>
        <meta
          name="description"
          content="The new tunisia developer community, collaborate and innovation ideas"
        />
      </Head>

      {/* <div className={styles.homeContainer}> */}
      <Container>
        <div style={{ marginTop: "150px" }}>
          <div className={styles.headings}>
            <Heading size={3}>Digital Transformation Community</Heading>
            <Heading size={2}>Voice Communication System</Heading>
            {/* <Heading size={2}>Data visualization for Tunisian Economy</Heading> */}
          </div>

          <motion.div
            className={styles.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
          >
            <Button
              outline="granted"
              big
              success
              onClick={() =>
                router.push({
                  pathname: "/debates",
                })
              }
            >
              Join Our Community
            </Button>
          </motion.div>
        </div>
      </Container>
    </>
  );
}
