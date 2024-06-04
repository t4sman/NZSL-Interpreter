import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginSignup from '../LoginSignup/LoginSignup';

const Menu = () => (
  <>
  <p><a href="/"><i class="bi bi-camera"></i></a></p>
 
  <p><a href="#possibility"><i class="bi bi-book-half"></i></a></p>
  <p><a href="#learning"><i class="bi bi-motherboard"></i></a></p>
  <p><a href="#lib"><i class="bi bi-collection"></i></a></p>
  <p><a href="#tutorial">Tutorial</a></p>
  <p><a href="/jonnyPage">jonnyPage</a></p>
  <p><a href="/tasPage">tasman</a></p>
  <p><a href="/tunPage">tun</a></p>
  <p><a href="/howto">How to use</a></p>
  </>
)

const Navbar = () => 
{
  const [toggleMenu, setToggleMenu] = useState(false);
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
        <p>Sign In</p>
        <button type="button">Sign up</button>
      </div>

      
      <div className='gpt3__navbar-menu' >
        {toggleMenu
        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/>
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
        
        }
        {toggleMenu && (
          <div className='gpt3__navbar-menu_container scale-up-center'>
            <div className='gpt3__navbar-menu_container-links'>
              <Menu />
              <div className='gpt3__navbar-menu_containier-links-sign'>
                <p>Sign In</p>
                <button type="button">Sign Up</button>
                <LoginSignup />
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default Navbar
