import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import styles from "./sidebar.module.css";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: styles.navText,
  },
  {
    title: "Debates",
    path: "/debates",
    icon: <IoIcons.IoMdMicrophone />,
    cName: styles.navText,
  },
  {
    title: "Create room",
    path: "/createroom",
    icon: <FaIcons.FaPlus />,
    cName: styles.navText,
  },
  {
    title: "My Ideas",
    path: "/ideas",
    icon: <FaIcons.FaLightbulb />,
    cName: styles.navText,
  },
  {
    title: "Tunisia Data",
    path: "/tunisianow",
    icon: <FaIcons.FaGlobeAfrica />,
    cName: styles.navText,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <FaIcons.FaInfo />,
    cName: styles.navText,
  },
];
