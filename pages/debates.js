import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import RoomList from "../components/RoomList";
import Heading from "../components/Heading";
import config from "../config";

import { useFirestoreRooms } from "../hooks/useFirestore";
import Button from "../components/Button";
import { Loading } from "../components/Loading";
import styles from "../styles/debates.module.css";

export default function Debates() {
  const router = useRouter();
  const [rooms, isLoading] = useFirestoreRooms();

  const exploreRooms = useMemo(() => {
    const now = +new Date() / 1000;

    return rooms.filter((room) => room.lastPing);
    // .filter((room) => now - room.lastPing.seconds < 30);
  }, [rooms]);

  return (
    <>
      <div style={{ marginTop: 20, width: "fit-content" }}>
        <Head>
          <title>Debates | The New Tunisia</title>
          <meta
            name="description"
            content="Talk with others voice conversations, the new tunisia developer community"
          />
        </Head>

        <Button
          outline="granted"
          fullWidth
          big
          onClick={() => {
            router.push({
              pathname: "/createroom",
            });
          }}
        >
          Create Your Own Room
        </Button>
      </div>
      <div className={styles.roomCard}>
        {config.firebase.enabled && (
          <div className={styles.spacing} style={{ marginTop: 30 }}>
            <Heading size={2}>Available Rooms</Heading>
            {isLoading && <Loading />}

            {!isLoading && exploreRooms.length === 0 && (
              <div>No rooms available</div>
            )}
            <RoomList rooms={exploreRooms} />
          </div>
        )}
      </div>
    </>
  );
}
