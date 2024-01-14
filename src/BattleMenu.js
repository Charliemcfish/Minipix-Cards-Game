// BattleMenu.js
import React, { useState } from 'react';
import BattleOne from './BattleOne'; // Import the new component
import './Battle.css'; // Import the styles

const BattleMenu = ({ onBack }) => {
  const playSlashSound = () => {
    const slashAudio = new Audio('/slash.mp3');
    slashAudio.play();
  };

  const playClickSound = () => {
    const clickAudio = new Audio('/click.mp3');
    clickAudio.play();
  };

  const [currentBattle, setCurrentBattle] = useState(null);

  const handleButtonClick = (battleType) => {
    console.log(`Clicked on ${battleType} battle button`);
    playSlashSound();

    // Set the currentBattle state to trigger rendering BattleOne component
    setCurrentBattle(battleType);
  };

  const handleBackClick = () => {
    playClickSound();
    onBack();
  };

  return (
    <div className="battle-menu">
      {!currentBattle && (
        <>
          <h1 style={{ fontFamily: 'DisposableDroidBB' }}>Battle Arena</h1>
          <h2 style={{ fontFamily: 'DisposableDroidBB' }}>Choose a battle mode...</h2>
          <div className="battle-buttons">
            <button
              onClick={() => handleButtonClick('1v1')}
              style={{ fontFamily: 'DisposableDroidBB', fontSize: '4em' }}
            >
              1 v 1 PLAY NOW!
            </button>
            
            <button style={{ fontFamily: 'DisposableDroidBB', fontSize: '4em' }}
            > 2 v 2 COMING SOON </button>

<button style={{ fontFamily: 'DisposableDroidBB', fontSize: '4em' }}
            > Online COMING SOON </button>

          </div>

          <button onClick={handleBackClick} className="back-button" style={{ fontFamily: 'DisposableDroidBB', fontSize: '4em', marginTop: '150px' }}
>
            Back
          </button>
        </>
      )}

      {currentBattle === '1v1' && (
        <BattleOne onBack={() => setCurrentBattle(null)} />
      )}
    </div>
  );
};

export default BattleMenu;
