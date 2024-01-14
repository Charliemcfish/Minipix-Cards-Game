import React, { useState, useEffect } from 'react';
import './Battle.css'; // Import the styles for BattleOne

const BattleOne = ({ onBack }) => {
  const [playerCard, setPlayerCard] = useState(0);
  const [opponentCard, setOpponentCard] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [winner, setWinner] = useState(null);
  const [showVsOverlay, setShowVsOverlay] = useState(true);
  const [attackMessage, setAttackMessage] = useState('');
  const [playerTurn, setPlayerTurn] = useState(true); // Flag to indicate player's turn
  const attackGifs = ['attack1.gif', 'attack2.gif', 'attack3.gif', 'attack4.gif', 'attack5.gif'];
  const attackSounds = ['attack1.mp3', 'attack2.mp3', 'attack3.mp3', 'attack4.mp3', 'attack5.mp3'];
  const [isAttackButtonHidden, setIsAttackButtonHidden] = useState(false);
  


  const attackSpells = [
    'Thunder Surge', 'Falling Terror Launch', 'Complete Phoenix Fists', 'Lotus Fists', 'Supreme Kick',
    'Chief Nightmare Dance', 'Brutal Shadow Rush', 'Thunder Fracture', 'Yin Hurl', 'Golden Aura Claw',
    'Black Boulder Bolt', 'Paralysis Knock', 'Waterfall Bash', 'False Crane Launch', 'Crazed Ice Chop',
    'Toxin Slam', 'Beast Kick', 'Twin Lotus Release', 'Monstrous Armageddon Stomp', 'Fire Shot', 'Earth Surge',
    'Whispered Winter Fracture', 'Minor Stealth Blade', 'Wing Method', 'Bone Cut', 'Cruel Death Blast',
    'Grim Bear Claw', 'Graceful Darkness Technique', 'Moon Crush', 'Vapor Drain', 'Reckless Void Spell',
    'Flawless Enigma Whip'
  ];

  useEffect(() => {
    // Simulate card selection (replace this with actual logic)
    const playerCardNumber = Math.floor(Math.random() * 100) + 1;
    const opponentCardNumber = Math.floor(Math.random() * 100) + 1;

    // Set player and opponent cards
    setPlayerCard(playerCardNumber * 5);
    setOpponentCard(opponentCardNumber * 5);

    // Show vs.gif overlay for 3 seconds
    setTimeout(() => {
      setShowVsOverlay(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const musicAudio = new Audio('/music.mp3');
    const battleAudio = new Audio('/battlearena.mp3');

    // Pause music.mp3 if it's currently playing
    musicAudio.pause();

    // Start playing battlearena.mp3
    battleAudio.loop = true; // Set to loop continuously
    battleAudio.play().catch(error => {
      console.error("Audio playback error:", error.message);
    });

    // Change the background to battlearena.gif
    document.body.style.backgroundImage = 'url("/battlearena.gif")';
    document.body.style.backgroundSize = 'cover';

    // Show vs.gif overlay for 3 seconds
    setTimeout(() => {
      setShowVsOverlay(false);
    }, 3000);

    // Cleanup function to stop music and reset background on component unmount
    return () => {
      battleAudio.pause();
      battleAudio.currentTime = 0; // Reset audio playback position
      musicAudio.pause(); // Pause music.mp3 instead of playing it
      document.body.style.backgroundImage = 'url("./interior.png")';
      document.body.style.backgroundSize = 'cover';
    };
  }, []);

  // Use refs to store references to player and opponent card elements
  const playerCardRef = React.useRef(null);
  const opponentCardRef = React.useRef(null);

  useEffect(() => {
    // Set initial card references after the initial render
    playerCardRef.current = document.querySelector('.player-card');
    opponentCardRef.current = document.querySelector('.opponent-card');
  }, []);

  const handleAttack = () => {
    if (playerTurn && !isAttackButtonHidden) {

       // Hide the attack button for 4 seconds
       setIsAttackButtonHidden(true);
       setTimeout(() => {
         setIsAttackButtonHidden(false);
       }, 4000);
     
      // Player's turn
      const spellIndex = Math.floor(Math.random() * attackSpells.length);
      const playerSpell = attackSpells[spellIndex];

      // Calculate damage as a percentage of the player's chosen card number * 5
      const playerDamagePercentage = Math.floor(Math.random() * 11) + 10; // Damage between 10 and 20
      const playerDamage = Math.floor((playerCard / 100) * playerDamagePercentage);

      // Display player's attack message
      setAttackMessage(`Player uses ${playerSpell}`);
      playRandomAttackGif();
      playRandomAttackSound();
      setTimeout(() => {
        setAttackMessage('');
      }, 2000);

      // Set opponent's card color to red for 0.5 seconds to indicate damage
      setOpponentCardColor('red');
      setOpponentHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));

      // Set a delay of 0.5 seconds, then reset card color
      setTimeout(() => {
        setOpponentCardColor('');
        setPlayerTurn(false); // Switch to opponent's turn after the player's attack

        // Set a delay of 1 second before opponent's turn
        setTimeout(() => {
          opponentAttack();
        }, 2000);
      }, 500);
    }
  };

  const playRandomAttackGif = () => {
    const randomAttackGif = attackGifs[Math.floor(Math.random() * attackGifs.length)];
    const attackGifContainer = document.querySelector('.attack-gif-container');

    // Set the attack gif source
    attackGifContainer.innerHTML = `<img src="${randomAttackGif}" alt="Attack Gif" />`;

    // Clear the attack gif after 1 second
    setTimeout(() => {
      attackGifContainer.innerHTML = '';
    }, 1000);
  };

  const playRandomAttackSound = () => {
    const randomAttackSound = attackSounds[Math.floor(Math.random() * attackSounds.length)];
    const attackSound = new Audio(`/${randomAttackSound}`);
    attackSound.play().catch(error => {
      console.error("Attack sound playback error:", error.message);
    });
  };

  const opponentAttack = () => {
    // Opponent's turn
    const spellIndex = Math.floor(Math.random() * attackSpells.length);
    const opponentSpell = attackSpells[spellIndex];

    // Calculate damage as a percentage of the opponent's chosen card number * 5
    const opponentDamagePercentage = Math.floor(Math.random() * 11) + 10; // Damage between 10 and 20
    const opponentDamage = Math.floor((opponentCard / 100) * opponentDamagePercentage);

    // Display opponent's attack message
    setAttackMessage(`Opponent uses ${opponentSpell}`);
    playRandomAttackGif();
    playRandomAttackSound();
    setTimeout(() => {
      setAttackMessage('');
    }, 2000);

    // Set player's card color to red for 0.5 seconds to indicate damage
    setPlayerCardColor('red');
    setPlayerHealth((prevHealth) => Math.max(prevHealth - opponentDamage, 0));

    // Set a delay of 0.5 seconds, then reset card color and switch back to player's turn
    setTimeout(() => {
      setPlayerCardColor('');
      setPlayerTurn(true);

      // Set a delay of 1 second before the player's turn
      setTimeout(() => {
        // The battle process ends, and the player can attack again
        checkForWinner();
      }, 1000);
    }, 500);
  };

  const setPlayerCardColor = (color) => {
    if (playerCardRef.current) {
      playerCardRef.current.style.backgroundColor = color;
    }
  };

  const setOpponentCardColor = (color) => {
    if (opponentCardRef.current) {
      opponentCardRef.current.style.backgroundColor = color;
    }
  };

  const checkForWinner = () => {
    // Check for a winner
    if (playerHealth === 0 || opponentHealth === 0) {
      setWinner(playerHealth === 0 ? 'opponent' : 'player');
    }
  };

  return (
    <div className="battle-one-container">
      {showVsOverlay && (
        <div className="vs-overlay">
          <img src="/vs.gif" alt="VS" />
        </div>
      )}

      <div className="battle-content">
        <div className="attack-gif-container"></div>
        <div className="attack-message">{attackMessage}</div>

        {winner ? (
          <div>
            <h2 style={{ fontSize: '2em' }}>{winner === 'player' ? 'You Win!' : 'Opponent Wins!'}</h2>
            <button onClick={onBack} style={{ fontSize: '1em' }}>Back</button>
          </div>
        ) : (
          <div>
            <div className="battle-cards">
              <div className="card player-card">
                <h3>YOU</h3>
                <img
                  src={`/cards/${Math.floor(playerCard / 5)}.png`} // Assuming cards are numbered 1-100
                  alt="Player Card"
                />
                <div className="health-bar" style={{ width: `${playerHealth}%` }}></div>
              </div>

              <div className="card opponent-card">
                <h3>OPPONENT</h3>
                <img
                  src={`/cards/${Math.floor(opponentCard / 5)}.png`} // Assuming cards are numbered 1-100
                  alt="Opponent Card"
                />
                <div className="health-bar" style={{ width: `${opponentHealth}%` }}></div>
              </div>
            </div>

             {/* Hide the button if isAttackButtonHidden is true */}
             {!isAttackButtonHidden && (
              <button
                onClick={handleAttack}
                style={{
                  fontSize: '1.5em',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontFamily: 'DisposableDroidBB',
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'red';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '';
                  e.target.style.transform = '';
                }}
              >
                Attack
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleOne;
