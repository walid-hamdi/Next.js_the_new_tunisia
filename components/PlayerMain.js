import { useContext, useEffect } from "react";
import { FiMic, FiMicOff, FiAlertTriangle } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";

import { PeerContextProvider, PeerContext } from "../contexts/PeerJSContext";
import {
  StreamContextProvider,
  StreamContext,
} from "../contexts/StreamContext";

import Streamer from "./Streamer";
import StreamPlayer from "./StreamPlayer";
import Heading from "./Heading";
import ConnectedPeersList from "./ConnectedPeersList";
import ActionGroup from "./ActionGroup";
import Button from "./Button";
import Container from "./Container";

import styles from "./playermain.module.css";

export default function PlayerMain({
  roomId,
  userName,
  roomName,
  roomTopic,
  roomLanguage,
  roomLocation,
  isHost,
}) {
  return (
    <StreamContextProvider>
      <PeerContextProvider
        initialContext={{
          isHost,
          roomId,
          user: {
            name: userName,
          },
          roomMetadata: {
            title: roomName,
            topic: roomTopic,
            language: roomLanguage,
            location: roomLocation,
          },
        }}
      >
        <Main
          user={{
            name: userName,
          }}
        />
      </PeerContextProvider>
    </StreamContextProvider>
  );
}

function Main({ user }) {
  const router = useRouter();

  if (!user.name) {
    router.push("/");
  }

  const { muteToggle, micMuted, startMicStream } = useContext(StreamContext);

  const {
    state: {
      roomId,
      peer,
      peerId,
      peerStatus,
      connToHost,
      connRole,
      roomMetadata,
      isHost,
      connectedPeers,
      peersOnRoom,
      peerList,
    },
    streams: { incomingStreams, outgoingStreams },
    actions: {
      onPromotePeerToSpeaker,
      onDemotePeerToListener,
      sendMessageToHost,
      // reconnectToHost,
    },
  } = useContext(PeerContext);

  useEffect(() => {
    if (!isHost) return;
    startMicStream();
  }, [isHost]);

  const shareLink =
    typeof window === "undefined"
      ? ""
      : `${window.location.protocol || ""}//${
          window.location.host || ""
        }/room/${roomId}`;

  async function onLeave() {
    if (isHost) {
      const agree = confirm(
        "As a host, when you quit the room all listeners will be disconnected"
      );
      if (!agree) return;
    }
    if (connToHost) connToHost.close();
    if (connectedPeers) {
      connectedPeers.forEach((conn) => {
        conn.close();
      });
    }
    if (outgoingStreams) {
      outgoingStreams.forEach((conn) => {
        conn.close();
      });
    }
    if (incomingStreams) {
      incomingStreams.forEach((conn) => {
        conn.call.close();
      });
    }
    router.push("/");
  }

  if (peerStatus === "error") {
    return (
      <Container>
        <div>
          <FiAlertTriangle size={62} />
          <Heading size={2}>Error</Heading>
          <p>Could not connect to room</p>
          <Link href="/" passHref>
            <Button as="a">Go Back</Button>
          </Link>
        </div>
      </Container>
    );
  }

  function handleReaction(emoji) {
    sendMessageToHost({
      action: "sendReaction",
      payload: emoji,
    });
  }

  return (
    <div className={styles.playerContainer}>
      <Container>
        <div className={styles.roomHeader}>
          <Button small success>
            Owner : {user.name}
          </Button>
          <Button small>Room Topic : {roomMetadata.topic}</Button>
          <Button small>Room Title : {roomMetadata.title}</Button>
          <Button small>Room Language : {roomMetadata.language}</Button>
          <Button small>Room Location : {roomMetadata.location}</Button>
        </div>
      </Container>
      <StreamPlayer />
      <ConnectedPeersList shareLink={isHost ? shareLink : null} />
      <ActionGroup className={styles.actionGroup}>
        <div className={styles.actionBar}>
          <Button avoid onClick={onLeave}>
            Leave
          </Button>

          {(isHost || connRole === "speaker") && (
            <Button style={{ marginLeft: 10 }} contrast onClick={muteToggle}>
              {micMuted && <FiMicOff />}
              {!micMuted && <FiMic />}
            </Button>
          )}
          {!isHost && (
            <Button
              style={{ marginLeft: 10 }}
              small
              outline
              contrast
              onClick={() => handleReaction("🙋‍♀️")}
            >
              🙋‍♀️
            </Button>
          )}
          {!isHost && (
            <Button
              style={{ marginLeft: 10 }}
              small
              outline
              contrast
              onClick={() => handleReaction("👍")}
            >
              👍
            </Button>
          )}
          {!isHost && (
            <Button
              style={{ marginLeft: 10 }}
              small
              outline
              contrast
              onClick={() => handleReaction("👎")}
            >
              👎
            </Button>
          )}
        </div>
        <Link href={"/debates"} style={{ justifySelf: "right" }}>
          <a target="_blank">
            <Button outline contrast>
              See all rooms available
            </Button>
          </a>
        </Link>
      </ActionGroup>
    </div>
  );
}
