import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Debates',
    path: '/debates',
    icon: <IoIcons.IoMdMicrophone />,
    cName: 'nav-text'
  },
  {
    title: 'Create room',
    path: '/createroom',
    icon: <FaIcons.FaPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Ideas',
    path: '/ideas',
    icon: <FaIcons.FaLightbulb />,
    cName: 'nav-text'
  },
  {
    title: 'Tunisia Now',
    path: '/tunisianow',
    icon: <FaIcons.FaGlobeAfrica />,
    cName: 'nav-text'
  },

];