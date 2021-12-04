import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser, FiHome, FiGlobe, FiMapPin, FiBookOpen } from "react-icons/fi";
import { firebase } from "../libs/firebase";

export default function RoomList({ rooms }) {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="rooms">
      {rooms.map((room) => (
        <Link key={room.roomId} href={user ? `/room/${room.roomId}` : `/`}>
          <a>
            <div>
              <FiHome style={{ marginRight: "6px" }} />
              {room.roomName}
            </div>
            <div>
              {room.users || 0} <FiUser style={{ marginLeft: "6px" }} />
            </div>
            <div>
              <FiBookOpen style={{ marginRight: "6px" }} /> {room.roomTopic}{" "}
            </div>

            <div>
              <FiGlobe style={{ marginRight: "6px" }} />
              {room.roomLanguage}{" "}
            </div>

            <div>
              <FiMapPin style={{ marginRight: "6px" }} />
              {room.roomLocation}{" "}
            </div>

            <span className="join-badge">
              {user ? "Join Now" : "Please Sigin to join"}
            </span>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .rooms {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .join-badge {
          display: inline-block;
          background-color: black;
          padding: 0.4em 0.7em;
        }
        div a {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          color: white;
          border: white;
          text-decoration: none;
          background-color: #14162b;
          margin: 0.7rem 0 0 0;
          padding: 1rem;
          border-radius: 15px;
          width: 260px;
          cursor: pointer;
        }
        .div a:hover {
          transform: scale(1.1);
          transition: all 0.2s cubic-bezier(0.17, 0.67, 0.66, 1.77);
        }
        a {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}
