import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";

const PlayerMain = dynamic(() => import("../../components/PlayerMain"), {
  ssr: false,
});

function RoomPage() {
  const router = useRouter();

  const { roomId, userName, roomName, roomTopic, roomLanguage, roomLocation } =
    router.query;

  return (
    <Layout>
      <PlayerMain
        roomId={roomId}
        userName={userName}
        roomName={roomName}
        roomTopic={roomTopic}
        roomLanguage={roomLanguage}
        roomLocation={roomLocation}
        isHost={true}
      />
    </Layout>
  );
}

export default RoomPage;
