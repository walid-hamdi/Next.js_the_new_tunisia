import { useEffect, useState } from "react";
import hark from "hark";
import stc from "string-to-color";
import cc from "classcat";
import { FiUser, FiMicOff } from "react-icons/fi";
import { CgCrown } from "react-icons/cg";

import styles from "./user.module.css";
import Image from "next/image";

const getInitials = function (string) {
  const names = `${string}`.trim().split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export default function User({
  host,
  onClick,
  hoverIcon,
  reaction,
  muted,
  me,
  stream,
  name,
  userPhoto,
  user,
  highlight,
  ...props
}) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!stream) return;
    if (!stream instanceof MediaStream) return;
    const speechEvents = hark(stream);
    speechEvents.on("speaking", () => setSpeaking(true));
    speechEvents.on("stopped_speaking", () => setSpeaking(false));
  }, [stream]);

  return (
    <div className={styles.User} {...props}>
      <div
        // className={cc([{ speaking, highlight }, `${styles.avatar}`])}

        onClick={onClick}
      >
        {onClick && hoverIcon && (
          <div className={styles.avatarAction}>{hoverIcon}</div>
        )}
        {/* <span>{getInitials(name)}</span> */}
        {/* {(muted || me || host) && !reaction && (
          <div className={styles.dot}>
            {muted && <FiMicOff />}
            {host && !me && <CgCrown />}
            {me && !muted && <FiUser />}
          </div>
        )} */}
        {reaction && <div className={styles.dot}>{reaction}</div>}
      </div>
      <div className={styles.userPhotoContainer}>
        <Image src={userPhoto} layout="fill" />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}
