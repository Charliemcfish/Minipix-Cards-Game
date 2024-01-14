// ChestOverlay.js
import React, { useEffect, useState } from 'react';
import './styles.css'; // Import the styles

const ChestOverlay = ({ cardNumber, cardValue, onClose }) => {
  const [showSuspense, setShowSuspense] = useState(true);

  useEffect(() => {
    const suspenseTimer = setTimeout(() => {
      setShowSuspense(false);
    }, 1500);

    return () => clearTimeout(suspenseTimer);
  }, []);

  useEffect(() => {
    const suspenseAudio = new Audio('/chestsuspense.mp3');
    suspenseAudio.play();
  }, []);

  return (
    <div className="shop-overlay">
      {showSuspense ? (
        <img src="./chestsuspense.gif" alt="Chest Suspense" style={{ width: '100%', marginBottom: '16px' }} />
      ) : (
        <>
          <p>Card Unlocked!</p>
          <img src={`./cards/${cardNumber}.png`} alt={`Card ${cardNumber}`} style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <p>Card Value: ₱{cardValue}</p>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
};

export default ChestOverlay;
