import React, { useState, useEffect } from "react";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { Loading } from "./Loading";

import styles from "./navbar.module.css";
import cn from "classcat";

import Button from "./Button";
import { useAuth } from "../contexts/AuthUserContext";
import Heading from "./Heading";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [appearNavbar, setAppearNavbar] = useState(false);

  const { authUser, loading, signOut, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/");
      setAppearNavbar(false);
      setUser(null);
      showDialogue();
    } else {
      setUser(authUser);
      router.push("/debates");
    }
  }, [authUser, loading]);

  const showDialogue = () => {};

  const handleSignWithGoogle = () => {
    setError(null);
    try {
      signInWithGoogle();
      setAppearNavbar(false);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div
        className={cn([
          styles.icon,
          styles.navIcon,
          `${appearNavbar ? styles.open : ""}`,
        ])}
        onClick={() => setAppearNavbar(!appearNavbar)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={cn([
          `${appearNavbar ? styles.appearNavbar : styles.disabledAppear} `,
        ])}
      >
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className={styles.navMenu}>
            <ul className={styles.navMenuItems}>
              <div className={styles.navBrand}>
                {user && (
                  <div className={styles.accountContainer}>
                    <div className={styles.photoProfile}>
                      {/* <p>Welcome {user.name}</p> */}
                      <Image
                        src={user.photoUrl || "/images/avatar.jpg"}
                        alt="Profile photo"
                        layout="fill"
                      />
                    </div>
                  </div>
                )}
              </div>

              {SidebarData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={item.cName}
                    onClick={() => setAppearNavbar(!appearNavbar)}
                  >
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
                <div className={styles.signInWrapper}>
                  <Button outline="granted" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                !loading && (
                  <div className={styles.signInWrapper}>
                    <Button
                      outline="granted"
                      big
                      avoid
                      onClick={handleSignWithGoogle}
                    >
                      Sign In
                    </Button>
                  </div>
                )
              )}
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Navbar;
