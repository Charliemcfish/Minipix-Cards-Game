import React, { useState, useEffect } from 'react';
import TitleScreen from './TitleScreen';
import CollectionPage from './CollectionPage';
import ShopPage from './ShopPage';
import Marketplace from './Marketplace';
import BattleMenu from './BattleMenu'; // Make sure this import statement is correct


import './styles.css';

const App = () => {
  const [screen, setScreen] = useState('title');
  const [pixCount, setPixCount] = useState(500); // Update the initial pixCount value to 500
  const [totalCardValue, setTotalCardValue] = useState(0);
  const [cards, setCards] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Play music.mp3 from a random starting point between 0 and 11 minutes
    const startingTime = Math.floor(Math.random() * 11 * 60); // Convert minutes to seconds
    const musicAudio = new Audio('/music.mp3');
    musicAudio.loop = true;

    const handleAudioError = (error) => {
      console.error('Audio error:', error.message);
      // Handle audio error as needed
    };

    // Set the initial playback time
    musicAudio.currentTime = startingTime;

    // Add event listener for audio error
    musicAudio.addEventListener('error', handleAudioError);

    // Play the audio
    musicAudio.play().catch(handleAudioError);

    return () => {
      // Clean up audio and remove event listener when component unmounts
      musicAudio.pause();
      musicAudio.removeEventListener('error', handleAudioError);
      musicAudio.currentTime = 0;
    };
  }, []);

  const handlePixCountChange = (newPixCount) => {
    setPixCount(newPixCount);
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('minipixGameState'));

    if (savedState) {
      setPixCount(savedState.pixCount);
      setTotalCardValue(savedState.totalCardValue);
      setCards(savedState.cards);
    } else {
      setPixCount(500); // Set the initial pixCount to 500
      setTotalCardValue(0);
      setCards([]);

      setShowOverlay(true);

      const overlayTimeout = setTimeout(() => {
        setShowOverlay(false);
      }, 22000);

      const audioTimeout = setTimeout(() => {
        const audio = new Audio('/jepix.mp3');
        audio.play();
      }, 19000);

      return () => {
        clearTimeout(overlayTimeout);
        clearTimeout(audioTimeout);
      };
    }
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('minipixGameState', JSON.stringify({ pixCount, totalCardValue, cards }));
    }, 20000);

    return () => clearInterval(saveInterval);
  }, [pixCount, totalCardValue, cards]);

  const handleStart = () => {
    setScreen('collection');
  };

  const handleGoToMarket = () => {
    setScreen('marketplace');
  };

  const handlePurchase = (chestType) => {
    if (pixCount >= chestType) {
      const newCardNumber = Math.floor(Math.random() * 80) + 21;
      const newCard = {
        number: newCardNumber,
        value: newCardNumber * 5,
      };

      setPixCount(pixCount - chestType);
      setTotalCardValue(totalCardValue + newCard.value);
      setCards([...cards, newCard]);
    } else {
      alert('Not enough pix to purchase this chest!');
    }
  };

  const handleSell = (card) => {
    const sellConfirmation = window.confirm(`Do you want to sell this card for ${card.value} pix?`);

    if (sellConfirmation) {
      const updatedCards = cards.filter((c) => c !== card);
      setPixCount(pixCount + card.value);
      setTotalCardValue(totalCardValue - card.value);
      setCards(updatedCards);
    }
  };

  const handleSellAll = () => {
    if (cards.length === 0) {
      alert('You have no cards to sell!');
      return;
    }

    setPixCount(pixCount + totalCardValue);
    setTotalCardValue(0);
    setCards([]);
  };

  const handleCardObtained = (obtainedCard) => {
    setCards([...cards, obtainedCard]);
    setTotalCardValue(totalCardValue + obtainedCard.value);
  };

  const handleGoToBattle = () => {
    setScreen('battle');
  };
  

  const handleBattleSelect = (battleType) => {
    // Handle battle selection logic
    console.log(`Selected battle type: ${battleType}`);
  };

  const handleBack = () => {
    if (screen === 'collection') {
      setScreen('shop');
      document.body.style.backgroundImage = "url('./shop.gif')";
    } else {
      setScreen('collection');
      document.body.style.backgroundImage = "url('./interior.png')";
    }
  };

  return (
    <div>
      {showOverlay && (
        <div className="overlay">
          <img src="/jepix.gif" alt="Overlay" />
        </div>
      )}

      {screen === 'title' && <TitleScreen onStart={handleStart} />}
      
      {screen === 'collection' && (
        <CollectionPage
          pixCount={pixCount}
          totalCardValue={totalCardValue}
          cards={cards}
          onSell={handleSell}
          onGoToShop={handleBack}
          onSellAll={handleSellAll}
          onGoToMarket={handleGoToMarket}
          onGoToBattle={handleGoToBattle} // Pass the function to CollectionPage
        />
      )}

      {screen === 'shop' && (
        <ShopPage
          pixCount={pixCount}
          onPurchase={handlePurchase}
          onBack={handleBack}
          onCardObtained={handleCardObtained}
        />
      )}

      {screen === 'marketplace' && (
        <Marketplace
          pixCount={pixCount}
          onBack={handleBack}
          onCardObtained={handleCardObtained}
          onPixCountChange={handlePixCountChange}
        />
      )}

{screen === 'battle' && (
  <BattleMenu
    onSelect={handleBattleSelect} // Pass any necessary props to BattleMenu
    onBack={handleBack} // Add the onBack prop if needed
  />
)}

    </div>
  );
};

export default App;
