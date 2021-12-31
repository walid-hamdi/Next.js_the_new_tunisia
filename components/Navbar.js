import React, { useState, useEffect, useContext } from "react";
import { SidebarData } from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { Loading } from "./Loading";

import styles from "./navbar.module.css";
import cn from "classcat";
import { useAuth } from "../contexts/AuthUserContext";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { authUser, loading, signOut, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/");
      showDialogue();
    } else setUser(authUser);
  }, [authUser, loading]);

  const showDialogue = () => {};

  const handleSignWithGoogle = () => {
    setError(null);
    signInWithGoogle();
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={styles.navMenu}>
          <ul className={styles.navMenuItems}>
            <div className={styles.navBrand}>
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo.svg"
                    alt="Picture of logo"
                    width={180}
                    height={150}
                  />
                </a>
              </Link>
            </div>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path}>
                    <a
                      className={
                        router.pathname === `${item.path}`
                          ? `${cn([styles.anchor, styles.active])}`
                          : `${styles.anchor}`
                      }
                    >
                      {item.icon}
                      <span className={styles.title}>{item.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}

            {loading && <Loading />}
            {!loading && user ? (
              <div className={styles.authDiv}>
                {/* <h1>Hello, <span></span>{user.displayName}</h1> */}
                <div className={styles.photoProfile}>
                  <Image
                    src={user.photoUrl || "/images/avatar.jpg"}
                    alt="Profile photo"
                    width="80%"
                    height="80%"
                  />
                </div>
                <button
                  className={cn([styles.button, styles.signOut])}
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            ) : (
              !loading && (
                <div className={styles.authDiv}>
                  <button
                    className={cn([styles.button, styles.signIn])}
                    onClick={handleSignWithGoogle}
                  >
                    Sign in
                  </button>
                </div>
              )
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
