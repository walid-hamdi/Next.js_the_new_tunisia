import React, { useState, useEffect } from 'react';
import { SidebarData } from './SidebarData';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image'

import firebase, { auth, signInWithGoogle } from '../libs/firebase';
import { Loading } from './Loading';



function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false)
    })
  }, [])

  console.log(user);


  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>



        <nav className='nav-menu'>

          <ul className='nav-menu-items'>

            <div className="nav-brand">
              <Link href="/">
                <a>
                  <Image
                    src='/images/logo.svg'
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
                    <a className={router.pathname === `${item.path}` ? 'active' : ''}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}

            {isLoading && <Loading />}
            {
              !isLoading && user ? (<div className="auth-div">
                {/* <h1>Hello, <span></span>{user.displayName}</h1> */}
                <div className="photo-profile">
                  <Image
                    src={user.photoURL}
                    alt="Profile photo"
                    width="80%"
                    height="80%"
                  />
                </div>
                <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
              </div>) : !isLoading && <div className="auth-div">
                <button className="button" onClick={signInWithGoogle}>
                  Sign in</button>
              </div>
            }

          </ul>
        </nav>
        <style jsx>{`

        .auth-div{
          position:absolute;
          bottom:30px;
          left:50%;
          transform:translate(-50%,0);

          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          gap:10px;

        }
        .auth-div .button{
          
          display:inline-block;
          border:none;
          padding:.4em .6em;
          background-color #14162b;
          color:white;
          cursor:pointer;
          font-size: 1.3rem;
          border-raduis:10px;
         
        
        }
        .auth-div .button.signout{
          background-color #14162b;
          color:white;
        }

        .auth-div .photo-profile{
     
          width:46px;
          height:46px;
          cursor:pointer;
          border:1px solid #14162b;
          margin-bottom:10px;
        
        }
        .auth-div .photo-profile:hover,
        .auth-div .button:hover{
          transform:scale(1.1);
          transition: all .2s ease-in-out;
        }

       .navbar {
        background-color: #060b26;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: center;
      }

      .nav-brand{
       
      
        cursor:pointer;

      }
      .nav-brand:hover{
        transform:scale(1.1);
        transition: all .2s cubic-bezier(.17,.67,.66,1.77);
      }
      
      .menu-bars {
        margin:0 1rem;
        font-size: 2rem;
        background: none;
      }
      
      .nav-menu {
        background-color: #060b26;
        width: 250px;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        
      }
      
    
      
      .nav-text {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 8px;
        list-style: none;
        height: 60px;
      }

      
      
      .nav-text a {
        text-decoration: none;
        color: #f5f5f5;
        font-size: 18px;
        width: 95%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-radius: 4px;
        transition: all .2s cubic-bezier(.4,-0.2,.66,1.77);

      }
      
      .nav-text a:hover ,.nav-text a.active {
        background-color: #1a83ff;

      }
      
      .nav-menu-items {
        width: 100%;
      }
      
      .navbar-toggle {
        background-color: #060b26;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
      
      span {
        margin-left: 16px;
      }
      
      `}</style>

      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
