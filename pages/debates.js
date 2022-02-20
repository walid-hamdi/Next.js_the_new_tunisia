import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import RoomList from "../components/RoomList";
import config from "../config";
import Heading from "../components/Heading";
import { useFirestoreRooms } from "../hooks/useFirestore";
import Button from "../components/Button";
import { Loading } from "../components/Loading";
import styles from "../styles/debates.module.css";
import Container from "../components/Container";

export default function Debates() {
  const router = useRouter();
  const [rooms, isLoading] = useFirestoreRooms();

  const exploreRooms = useMemo(() => {
    // const now = +new Date() / 1000;
    // return rooms
    //   .filter((room) => room.lastPing)
    //   .filter((room) => now - room.lastPing.seconds < 30);
    return rooms.filter((room) => room.users > 0);
  }, [rooms]);

  return (
    <>
      <Head>
        <title>Debates | The New Tunisia</title>
        <meta
          name="description"
          content="Talk with others voice conversations, the new tunisia developer community"
        />
      </Head>

      {/* <div className={styles.roomContainer}> */}
      <Container>
        <div className={styles.buttonCreateRoom}>
          <Button
            onClick={() => {
              router.push({
                pathname: "/createroom",
              });
            }}
          >
            Create Your Own Room
          </Button>
        </div>

        {config.firebase.enabled && (
          <div className={styles.spacing}>
            {isLoading && <Loading />}

            {!isLoading && exploreRooms.length === 0 && (
              <div>No rooms available</div>
            )}
            {exploreRooms.length > 0 && (
              <Heading size={2}>Available Rooms</Heading>
            )}
            <RoomList rooms={exploreRooms} />
          </div>
        )}
      </Container>
    </>
  );
}
