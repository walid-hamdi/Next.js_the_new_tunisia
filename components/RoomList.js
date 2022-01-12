import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FiUser, FiHome, FiGlobe, FiMapPin, FiBookOpen } from "react-icons/fi";
import { useAuth } from "../contexts/AuthUserContext";

import styles from "./roomlist.module.css";
import Button from "./Button";

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
            {user ? (
              <Button outline="granted" style={{ width: "fit-content" }}>
                Join
              </Button>
            ) : (
              <Button
                outline="granted"
                style={{ width: "fit-content", color: "gray" }}
              >
                logged in first
              </Button>
            )}
            {/* <span className={styles.joinBadge}>
              // {user ? "Join Now" : "Please Sign in to join"}
              //{" "}
            </span> */}
          </a>
        </Link>
      ))}
    </div>
  );
}
