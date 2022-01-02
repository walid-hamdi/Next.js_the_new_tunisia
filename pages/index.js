import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Heading from "../components/Heading";
import styles from "../styles/home.module.css";

export default function Index() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>The New Tunisia</title>
        <meta
          name="description"
          content="The new tunisia developer community, collaborate and innovation ideas"
        />
      </Head>

      <div className={styles.homeContainer}>
        <div className={styles.headings}>
          <Heading size={3}>Digital Transformation Platform</Heading>
          <Heading size={2}>Voice Communication System</Heading>
          <Heading size={2}>Data visualization for Tunisian Economy</Heading>
        </div>
        <div className={styles.button}>
          <Button
            outline="granted"
            fullWidth
            big
            onClick={() =>
              router.push({
                pathname: "/debates",
              })
            }
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </div>
  );
}
