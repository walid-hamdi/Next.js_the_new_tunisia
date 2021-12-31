export default function PeerContainer({ context = {} }) {
  const {
    roomId,
    roomName,
    currentUser,
    isHost = false,
    host = [],
    listeners = [],
  } = context;

  return <div></div>;
}
