import Head from "next/head";
import { useRouter } from "next/router";
import Button from "./Button";
import Heading from "./Heading";
import styles from "./home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-cover">
      <Head>
        <title>The New Tunisia</title>
        <meta
          name="description"
          content="The new tunisia developer community, collaborate and innovation ideas"
        />
      </Head>

      <div className={styles.homeContent}>
        <Heading size={1}>Digital Transformation Platform</Heading>
        <Heading size={2}>Voice Communication System</Heading>
        <Heading size={2}>Data visualization for Tunisian Economy</Heading>
        <div className={styles.button}>
          <Button
            outline="granted"
            fullWidth
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

// home -> debates -> createRoom -> roomCast
// home -> ideas
// home -> new Tunisia
// home -> sign in
