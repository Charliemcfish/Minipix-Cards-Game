// Marketplace.js
import React, { useEffect, useState } from 'react';
import './styles.css';

const Marketplace = ({ pixCount, onBack, onCardObtained, onPixCountChange }) => {
  const [marketplaceListings, setMarketplaceListings] = useState([]);

  const playClickSound = () => {
    const clickAudio = new Audio('/click.mp3');
    clickAudio.play();
  };

  const formattedPixCount = parseFloat(pixCount).toFixed(2);


  useEffect(() => {
    generateMarketplaceListings();
  }, []);

  const generateMarketplaceListings = () => {
    const newMarketplaceListings = [];

    for (let i = 0; i < 10; i++) {
      const randomCardNumber = Math.floor(Math.random() * 100) + 1;
      const randomSellerUsername = generateRandomUsername();
      const originalCardValue = randomCardNumber * 5;
      const discountedPrice = calculateDiscountedPrice(originalCardValue);
      const timeLeft = generateRandomTimeLeft();

      const listing = {
        cardNumber: randomCardNumber,
        sellerUsername: randomSellerUsername,
        originalCardValue: originalCardValue,
        discountedPrice: discountedPrice,
        timeLeft: timeLeft,
      };

      newMarketplaceListings.push(listing);
    }

    setMarketplaceListings(newMarketplaceListings);
  };

  const generateRandomUsername = () => {
    // A simple function to generate a random username
    const adjectives = ['Swift', 'Mystic', 'Brave', 'Fierce', 'Sly', 'Wise', 'Epic', 'Daring'];
    const nouns = ['Dragon', 'Phoenix', 'Sorcerer', 'Wizard', 'Knight', 'Rogue', 'Bard', 'Enchantress'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 100)}`;
  };

  const calculateDiscountedPrice = (originalPrice) => {
    // Calculate a discounted price (10-15% off the original price)
    const discountPercentage = Math.floor(Math.random() * 21) + 10; // Between 10% and 15%
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
  };

  const generateRandomTimeLeft = () => {
    // Generate a random time left for the listing between 1 minute and 1 hour
    const randomMinutes = Math.floor(Math.random() * 60) + 1;
    return `${randomMinutes} min`;
  };

  const handleBuyClick = (listing) => {
    // Play sell sound
    playClickSound(); // Play the click sound
    const audio = new Audio('/sell.mp3');
    audio.play();

    // Check if the player has enough pix to make the purchase
    if (pixCount >= listing.discountedPrice) {
      // Update the player's collection
      onCardObtained({
        number: listing.cardNumber,
        value: listing.discountedPrice,
      });

      // Deduct the listed price from the player's pix balance
      const updatedPixCount = pixCount - listing.discountedPrice;
      // Update the player's pix balance
      onPixCountChange(updatedPixCount);

      // Remove the listing for the bought card
      removeListing(listing);

      console.log(`Card ${listing.cardNumber} purchased for ₱${listing.discountedPrice}`);
    } else {
      // Play an error sound and display an alert if the player doesn't have enough pix
      const errorAudio = new Audio('/error.mp3');
      errorAudio.play();
      alert('Not enough pix to purchase this card!');
    }
  };

  const removeListing = (listingToRemove) => {
    const updatedListings = marketplaceListings.filter(listing => listing !== listingToRemove);
    setMarketplaceListings(updatedListings);
  };

  return (
    <div className="marketplace-page">
      <h2>Virtual Marketplace</h2>
      <h2>Buy cards from other players! Click on a card to preview it!</h2>
      <h2>₱{formattedPixCount}</h2>

      <button onClick={() => { onBack(); playClickSound(); }} className="back-button">
        Back to Collection
      </button>

      <table className="market-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Seller</th>
            <th>Original Value</th>
            <th>Listed Price</th>
            <th>Time Left</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marketplaceListings.map((listing, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`./cards/${listing.cardNumber}.png`}
                  alt={`Card ${listing.cardNumber}`}
                  style={{ maxWidth: '50px' }}
                />
              </td>
              <td>{listing.sellerUsername}</td>
              <td>₱{listing.originalCardValue}</td>
              <td>₱{listing.discountedPrice}</td>
              <td>{listing.timeLeft}</td>
              <td>
                <button onClick={() => handleBuyClick(listing)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marketplace;
