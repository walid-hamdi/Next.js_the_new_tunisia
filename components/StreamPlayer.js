import { useRef, useContext, useEffect, useState, useMemo } from "react";
import { FiX, FiPlus } from "react-icons/fi";

import { PeerContext } from "../contexts/PeerJSContext";

import User from "./User";
import Heading from "./Heading";
import Container from "./Container";
import { StreamContext } from "../contexts/StreamContext";
import useRoomEvents from "../hooks/useRoomEvents";

import styles from "./streamplayer.module.css";

export default function StreamPlayer() {
  const {
    // incomingStreams,
    peerConnError,
    // connRole,
    // peerId,
    userName,
    // onDemotePeerToListener,
    // incomingStreamsObj,
    streams: { incomingStreams },
    state: { peerList, connRole, peer, peerId },
    actions: { onPromotePeerToSpeaker, onDemotePeerToListener },
  } = useContext(PeerContext);

  const { micAudioStream, startMicStream } = useContext(StreamContext);

  const [recentEvents, roomEvents] = useRoomEvents();

  const speakers = useMemo(() => {
    return peerList
      .filter(Boolean)
      .filter((peer) => peer.metadata.isSpeaker)
      .map((peer) => {
        // Peer has stream
        let stream;

        const peerHasStream = incomingStreams.find(
          (call) => call.call.peer === peer.peer
        );

        if (peerHasStream) {
          stream = peerHasStream?.audioStream;
        }

        if (peer.peer === peerId) {
          stream = micAudioStream;
        }

        return {
          ...peer,
          stream, // TODO: Add incoming stream for animation
        };
      });
  }, [peerList]);

  const reactions = useMemo(() => {
    return recentEvents.filter(({ eventName }) => eventName === "reaction");
  }, [recentEvents]);

  return (
    <div style={{ maxHeight: "30vh" }}>
      <Container>
        <Heading size={2}>Speakers ({speakers.length})</Heading>
      </Container>
      <div className={styles.grid}>
        {peerConnError && <div>Error on connection</div>}
        {speakers.map((speaker) => (
          <User
            key={speaker?.peer}
            userPhoto={"/images/avatar.jpg"}
            name={
              speaker?.metadata?.user?.name
                ? speaker.metadata.user.name
                : "Anonym"
            }
            host={speaker?.metadata?.isHost}
            me={speaker.peer === peerId}
            stream={speaker.stream}
            onClick={
              connRole === "host" && !speaker?.metadata?.isHost
                ? () => {
                    onDemotePeerToListener(speaker.peer);
                  }
                : null
            }
            reaction={
              reactions.find(({ peer: peerId }) => peerId === speaker?.peer)
                ?.eventContent
            }
            hoverIcon={<FiX />}
          />
        ))}
      </div>
    </div>
  );
}
