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

import { RiWhatsappLine, RiTelegramLine, RiLinksFill } from "react-icons/ri";
import { WhatsappShareButton, TelegramShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./playermain.module.css";

export default function PlayerMain({
  roomId,
  userName,
  roomName,
  roomTopic,
  roomLanguage,
  roomLocation,
  isHost,
  userPhoto,
}) {
  return (
    <StreamContextProvider>
      <PeerContextProvider
        initialContext={{
          isHost,
          roomId,
          user: {
            name: userName,
            userPhoto: userPhoto,
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

  const shareLinks = () => {
    const shareMessage = `Join my Room with this link`;

    return (
      shareLink && (
        <Container>
          {/* <p style={{ marginBottom: "1rem" }}>Share link</p> */}
          <div
            style={{
              fontSize: "3rem",
              position: "absolute",
              right: "3rem",
              top: "3rem",
            }}
          >
            <WhatsappShareButton
              style={{ marginRight: 20 }}
              url={shareLink}
              title={shareMessage}
            >
              <RiWhatsappLine />
            </WhatsappShareButton>
            <TelegramShareButton
              style={{ marginRight: 20 }}
              url={shareLink}
              title={shareMessage}
            >
              <RiTelegramLine />
            </TelegramShareButton>
            <CopyToClipboard text={shareLink}>
              <RiLinksFill style={{ cursor: "pointer" }} />
            </CopyToClipboard>
          </div>
        </Container>
      )
    );
  };

  return (
    <>
      <Container>
        <div>
          {/* <Button small success>
            Owner : {user.name}
          </Button> */}
          {/* <Button small>Room Topic : {roomMetadata.topic}</Button>
          <Button small>Room Title : {roomMetadata.title}</Button>
          <Button small>Room Language : {roomMetadata.language}</Button>
          <Button small>Room Location : {roomMetadata.location}</Button> */}
          {shareLinks()}
        </div>
        <StreamPlayer />
        <ConnectedPeersList />

        <ActionGroup>
          <Button avoid onClick={onLeave}>
            X
          </Button>

          {(isHost || connRole === "speaker") && (
            <Button contrast onClick={muteToggle}>
              {micMuted && <FiMicOff />}
              {!micMuted && <FiMic />}
            </Button>
          )}
          {!isHost && (
            <Button small outline contrast onClick={() => handleReaction("🙋‍♀️")}>
              🙋‍♀️
            </Button>
          )}
          {!isHost && (
            <Button small outline contrast onClick={() => handleReaction("👍")}>
              👍
            </Button>
          )}
          {!isHost && (
            <Button small outline contrast onClick={() => handleReaction("👎")}>
              👎
            </Button>
          )}

          <Link href={"/debates"}>
            <a target="_blank">
              <Button small outline contrast>
                All rooms
              </Button>
            </a>
          </Link>
        </ActionGroup>
      </Container>
    </>
  );
}
