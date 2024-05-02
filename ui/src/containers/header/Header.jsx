import React from 'react';
import './header.css';
import ai from '../../assets/Illustration.png';
const Header = () => {
  return (
    <div className='gpt3__header section__padding' id="home">
      <div className='gpt3__header-content'>
      <h1 className='gradient__text'>Translate New Zealand sign language with AI</h1>
      <p>stuff about sign language and out app stuff about sign language and out app stuff about sign language and out app</p>
      <div className='header__button'>
        <input type='email' placeholder='Signs you want to know'></input>
        <button type='button'>Learn signs</button>
      </div>
      </div> 
      <div className='gpt3__header-image'>
        <img src={ai} alt="ai"/>
      </div>
    </div>
  )
}

export default Header
