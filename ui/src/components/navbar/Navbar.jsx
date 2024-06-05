import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSignOut from 'react-auth-kit/hooks/useSignOut';


const Menu = () => (
  <>
    <p><a href="/"><i className="bi bi-camera"></i></a></p>
    <p><a href="#possibility"><i className="bi bi-book-half"></i></a></p>
    <p><a href="#learning"><i className="bi bi-motherboard"></i></a></p>
    <p><a href="#lib"><i className="bi bi-collection"></i></a></p>
    <p><a href="#tutorial">Tutorial</a></p>
    <p><a href="/jonnyPage">jonnyPage</a></p>
    <p><a href="/tasPage">tasman</a></p>
    <p><a href="/tunPage">tun</a></p>
  </>
);

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleSignUp = () => {
    window.location.href = "/Auth";
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/check-auth', {
          credentials: 'include'
        });
        if (response.status === 200) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUsername(data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const signOut = useSignOut();

  const handleLogout = async () => {
    signOut();
    setIsLoggedIn(false);
  };

  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links'>
        <div className='gpt3__navbar-links_logo scale-up-center'>
          <p>NZSL Interpreter</p>
        </div>
        <div className='gpt3__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='gpt3__navbar-sign'>
        {isLoggedIn ? (
          <>
            <p>Welcome {username}!</p>
            <button type="btn" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <p>Sign In</p>
            <button type="btn" onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </div>
      <div className='gpt3__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='gpt3__navbar-menu_container scale-up-center'>
            <div className='gpt3__navbar-menu_container-links'>
              <Menu />
              <div className='gpt3__navbar-menu_container-links-sign'>
                {isLoggedIn ? (
                  <>
                    <p>Welcome {username}!</p>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <button type="button" onClick={handleSignUp}>Sign Up</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
