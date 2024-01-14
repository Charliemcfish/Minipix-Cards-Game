import React, { useState, useEffect } from 'react';
import ChestOverlay from './ChestOverlay';
import './styles.css';

const ShopPage = ({ pixCount, onPurchase, onBack, onCardObtained }) => {
  const [chestOverlay, setChestOverlay] = useState(null);
  const [willyTip, setWillyTip] = useState('');
  const [freeCardCooldown, setFreeCardCooldown] = useState(false);

  const playClickSound = () => {
    const clickAudio = new Audio('/click.mp3');
    clickAudio.play();
  };

  const playUnlockSound = () => {
    const unlockAudio = new Audio('/unlock.mp3');
    unlockAudio.play();
  };

  const formattedPixCount = parseFloat(pixCount).toFixed(2);

  // Willy's tips array
  const willyTips = [
    "Willy's Tips: Diamond Chests give ye thy best cards!",
    'Willy\'s Tips: No refunds on ye Monster Keys, if you die its thy Fault!',
    'GIVE MEEEE YEEE MONEEEY!',
    'Welcome back thy favourite customer!',
    'Willy\'s Tips: Click ye trade button to buy cards off other players!!!',
    'Have ye found thy Animated MiniPIx Cards yet?',
  ];

  useEffect(() => {
    // Set a random Willy's tip when the component mounts
    setWillyTip(willyTips[Math.floor(Math.random() * willyTips.length)]);
  }, [willyTips]);

  const handlePurchase = (chestType) => {
    playClickSound();

    if (pixCount < chestType) {
      const errorAudio = new Audio('/error.mp3');
      errorAudio.play();
      alert('Not enough pix to purchase this chest!');
      return;
    }

    let cardNumber;
    if (chestType === 100) {
      cardNumber = Math.floor(Math.random() * 40) + 1;
    } else if (chestType === 250) {
      cardNumber = Math.floor(Math.random() * 60) + 11;
    } else if (chestType === 500) {
      cardNumber = Math.floor(Math.random() * 30) + 71;
    } else {
      console.error('Invalid chest type');
      return;
    }

    const cardValue = cardNumber * 6;
    setChestOverlay({
      cardNumber,
      cardValue,
    });

    onPurchase(chestType);
    playUnlockSound();
    onCardObtained({
      number: cardNumber,
      value: cardValue,
    });
  };

  const handleCloseOverlay = () => {
    setChestOverlay(null);
  };

  const handleFreeCardClick = () => {
    playClickSound();
  
    if (freeCardCooldown) {
      alert("WILLY: Nice try! Ye must wait 60 seconds before thy give ye another FREE CARD!");
      const errorAudio = new Audio('/error.mp3');
      errorAudio.play();
      return;
    }

    const cardNumber = Math.floor(Math.random() * 100) + 1;
    const cardValue = cardNumber * 6;

    setChestOverlay({
      cardNumber,
      cardValue,
    });

    onCardObtained({
      number: cardNumber,
      value: cardValue,
    });

    setFreeCardCooldown(true);

    setTimeout(() => {
      setFreeCardCooldown(false);
    }, 60000); // 60 seconds cooldown
  };

  return (
    <div className="shop-page">
      <h1>Willys Shop</h1>
      <h1>₱{formattedPixCount}</h1>

     <button onClick={() => { onBack(); playClickSound(); }} className="back-button">
        Back to Collection
      </button>



      <div className="chest-container">
        <button className="chest-button" onClick={() => handlePurchase(100)}>
          <img src="/woodenchest.png" alt="Wooden Chest" />
          <div>Wooden Chest (100 ₱)</div>
          <div>Unlock a random Common Card</div>
        </button>
        <button className="chest-button" onClick={() => handlePurchase(250)}>
          <img src="/goldchest.png" alt="Golden Chest" />
          <div>Golden Chest (250 ₱)</div>
          <div>Unlock a random Uncommon Card</div>
        </button>
        <button className="chest-button" onClick={() => handlePurchase(500)}>
          <img src="/diamondchest.png" alt="Diamond Chest" />
          <div>Diamond Chest (500 ₱)</div>
          <div>Unlock a random Rare Card</div>
        </button>
      </div>


      <button onClick={handleFreeCardClick} className="free-card-button">
      <img src="/freecard.png" alt="Free Card" />

  FREE CARD!
</button>
   

      {chestOverlay && (
        <ChestOverlay
          cardNumber={chestOverlay.cardNumber}
          cardValue={chestOverlay.cardValue}
          onClose={handleCloseOverlay}
        />
      )}

      {willyTip && (
        <div className="willy-tips">
          <p style={{ color: 'lightgreen' }}>{willyTip}</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
