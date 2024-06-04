import React from 'react';
import { Navbar, MediaPipe, GuideButton} from './components';
import { Footer,  Features,  Header } from './containers';
import './App.css';
import TranslationBox from './components/translationBox/TranslationBox';
const App = () => {
return (
	<div className='App'>
		<div className='gradient__bg'>
			<Navbar />
			<Header />
			<GuideButton />
		</div>
		
		<div className='gradient__bg'>	
			<Features />
		</div>
		<div className='gradient__bg'>
			<Footer />
	
		</div>
	</div>
  )
}

export default App
