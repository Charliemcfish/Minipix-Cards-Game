// TitleScreen.js
import React from 'react';
import './styles.css'; // Import the styles

const TitleScreen = ({ onStart }) => {
  const playGameStartSound = () => {
    const gameStartAudio = new Audio('/gamestart.mp3');
    gameStartAudio.play();
  };

  return (
    <div className="title-screen" onClick={() => { onStart(); playGameStartSound(); }} style={{ cursor: 'pointer' }}>
      <img src="/title.gif" alt="Title" />
      <img src="/desc.gif" alt="Description" />
      <img src="/clicktostart.gif" alt="Click to Start" />
      <img src="/dev.gif" alt="Developer" />

   
    </div>
  );
};

export default TitleScreen;
