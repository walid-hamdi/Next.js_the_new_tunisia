import { useContext, useMemo } from "react";

import { FiX, FiPlus } from "react-icons/fi";

import { PeerContext } from "../contexts/PeerJSContext";
import useRoomEvents from "../hooks/useRoomEvents";
import User from "./User";
import Heading from "./Heading";
import Container from "./Container";

import styles from "./connectedpeerslist.module.css";

export default function ConnectedPeersList() {
  const {
    state: { peerId, connRole, peerList, isHost },
    actions: { onPromotePeerToSpeaker },
  } = useContext(PeerContext);

  const [recentEvents, roomEvents] = useRoomEvents();

  const listenersPeers = peerList.filter((peer) => !peer.metadata.isSpeaker);

  function handleUserClick(peer) {
    if (!isHost) return;
    onPromotePeerToSpeaker(peer.peer);
  }

  const reactions = useMemo(() => {
    return recentEvents.filter(({ eventName }) => eventName === "reaction");
  }, [recentEvents]);

  return (
    <div style={{ maxHeight: "30vh" }}>
      <Container>
        <Heading size={2}>Listeners ({listenersPeers.length})</Heading>
      </Container>
      <div className={styles.grid}>
        {listenersPeers.map((peer) => (
          <User
            key={peer.peer}
            me={peer.peer === peerId}
            name={peer.metadata?.user?.name || "Anonym"}
            onClick={isHost ? () => handleUserClick(peer) : null}
            hoverIcon={<FiPlus />}
            reaction={
              reactions.find(({ peer: peerId }) => peerId === peer.peer)
                ?.eventContent
            }
          />
        ))}
      </div>
    </div>
  );
}
