import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/logo.svg';

const Menu = () => (
  <>
  <p><a href="#home">Home</a></p>
  <p><a href="jonnyPage">jonnyPage</a></p>
  <p><a href="#possibility">My Learning</a></p>
  <p><a href="#learning">Team</a></p>
  <p><a href="#lib">Library</a></p>
  <p><a href="#tutorial">Tutorial</a></p>
  </>
)

const Navbar = () => 
{
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links'>
        <div className='gpt3__navbar-links_logo scale-up-center'>
          <p>NZSL Interprater</p>
        </div>
        <div className='gpt3__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='gpt3__navbar-sign'>
        <p>Sign In</p>
        <button type="button">Sign up</button>
      </div>

      
      <div className='gpt3__navbar-manu' >
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
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default Navbar
