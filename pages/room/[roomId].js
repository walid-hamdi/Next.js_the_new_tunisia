import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthUserContext";

import styles from "../../styles/roompage.module.css";

const PlayerMain = dynamic(() => import("../../components/PlayerMain"), {
  ssr: false,
});

export default function RoomPage(props) {
  const router = useRouter();
  const [willingToConnect, setWillingToConnect] = useState(false);
  const [joinFormError, setJoinFormError] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const audioEl = useRef();

  const { roomId, roomName, roomTopic, roomLanguage, roomLocation } =
    router.query;

  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      // router.push("/")
    } else setUser(authUser);
    console.log(user);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
  }, [user]);

  function validForm() {
    if (!username) {
      setJoinFormError("You must auth first!");
      return false;
    }
    setJoinFormError(false);
    return true;
  }

  function joinRoom() {
    if (!validForm()) return;
    audioEl.current.play();
    setWillingToConnect(true);
    return;
  }

  return (
    <>
      <Head>
        <title>Room collaboration | The New Tunisia</title>
        <meta
          name="description"
          content="Debate, connect, sharing, technologies and make ideas , the new tunisia developer community"
        />
      </Head>
      {!willingToConnect && (
        <div className={styles.willingToConnect}>
          {/* <Heading size={2}>Join Room</Heading>
            <div>
              <Input placeholder="Name" onChange={e => setUserName(e.target.value)} />
            </div> */}
          <Heading size={3}>
            Have a good conversation (BE POLITE , BE ACTIVE)
          </Heading>

          <audio
            style={{ display: "none" }}
            ref={audioEl}
            src="/silence.mp3"
            controls
          />
          <div>
            {joinFormError && (
              <div className={styles.error}>{joinFormError}</div>
            )}
            <Button big onClick={joinRoom}>
              Join Now
            </Button>
          </div>
        </div>
      )}
      {willingToConnect && (
        <PlayerMain
          roomId={roomId}
          userName={username}
          // roomName={roomName}
          // roomTopic={roomTopic}
          // roomLanguage={roomLanguage}
          // roomLocation={roomLocation}
          isHost={false}
        />
      )}
    </>
  );
}
