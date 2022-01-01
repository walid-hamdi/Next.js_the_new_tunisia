import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FiUser, FiHome, FiGlobe, FiMapPin, FiBookOpen } from "react-icons/fi";
import { useAuth } from "../contexts/AuthUserContext";

import styles from "./roomlist.module.css";

export default function RoomList({ rooms }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      // router.push("/")
    } else setUser(authUser);
  }, [authUser, loading]);

  // http://localhost:3000/room/e9850f1e-fcd7-456b-89f4-012a69d652a7
  // http://localhost:3000/cast/e9850f1e-fcd7-456b-89f4-012a69d652a7

  return (
    <div className={styles.rooms}>
      {rooms.map((room) => (
        <Link
          key={room.roomId}
          href={{
            pathname: user ? `/room/${room.roomId}` : `/`,
          }}
        >
          <a className={styles.roomLinkWrapper}>
            <div className={styles.roomContainer}>
              <div>
                <FiHome style={{ marginRight: "6px" }} />
                {room.roomName}
              </div>
              <div>
                {room.users || 0} <FiUser style={{ marginLeft: "6px" }} />
              </div>
            </div>

            <div className={styles.roomTopicWrapper}>
              <FiBookOpen />
              <span className={styles.roomTopic}> {room.roomTopic}</span>
            </div>

            <div className={styles.roomContainer}>
              <div>
                <FiGlobe style={{ marginRight: "6px" }} />
                {room.roomLanguage}
              </div>
              <div>
                <FiMapPin style={{ marginRight: "6px" }} />
                {room.roomLocation}
              </div>
            </div>

            <span className={styles.joinBadge}>
              {user ? "Join Now" : "Please Sign in to join"}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
