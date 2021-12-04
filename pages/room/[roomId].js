import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import { firebase } from "../../libs/firebase";

const PlayerMain = dynamic(() => import("../../components/PlayerMain"), {
  ssr: false,
});

export default function RoomPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [willingToConnect, setWillingToConnect] = useState(false);
  const [joinFormError, setJoinFormError] = useState(false);

  const audioEl = useRef();

  const { roomId } = router.query;

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserName(user.displayName);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function validForm() {
    if (!userName) {
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
    <Layout>
      {!willingToConnect && (
        <div className="spacing willing-to-connect">
          {/* <Heading size={2}>Join Room</Heading>
            <div>
              <Input placeholder="Name" onChange={e => setUserName(e.target.value)} />
            </div> */}
          <Heading size={1}>
            Please be responsible after you join because there are serious rules
            for bad people (BE POLITE , BE ACTIVE)
          </Heading>

          <audio
            style={{ display: "none" }}
            ref={audioEl}
            src="/silence.mp3"
            controls
          />
          <div>
            {joinFormError && <div className="error">{joinFormError}</div>}
            <Button big onClick={joinRoom}>
              Join Now
            </Button>
          </div>
        </div>
      )}
      {willingToConnect && (
        <PlayerMain roomId={roomId} userName={userName} isHost={false} />
      )}
      <style jsx>{`
        .willing-to-connect {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .spacing > * {
          margin-top: 10px;
        }
        .error {
          font-size: 12px;
          text-align: center;
          margin: 6px 0;
        }
      `}</style>
    </Layout>
  );
}
