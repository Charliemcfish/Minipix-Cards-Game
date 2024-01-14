// CollectionPage.js
import React, { useState } from 'react';
import './styles.css'; // Import the styles

const CollectionPage = ({ pixCount, totalCardValue, cards, onSell, onGoToShop, onGoToMarket, onSellAll, onGoToBattle }) => {
  const [sellingAll, setSellingAll] = useState(false);
  const [sortByValue, setSortByValue] = useState(false);

  const formattedPixCount = parseFloat(pixCount).toFixed(2);

  const formattedTotalCardValue = parseFloat(totalCardValue).toFixed(2);


  const playMouseOverSound = () => {
    const mouseOverAudio = new Audio('/mouseover.mp3');
    mouseOverAudio.play();
  };

  const playSellSound = () => {
    const sellAudio = new Audio('/sell.mp3');
    sellAudio.play();
  };

  const playClickSound = () => {
    const clickAudio = new Audio('/click.mp3');
    clickAudio.play();
  };

  const getCardBackgroundColor = (cardNumber) => {
    if (cardNumber >= 1 && cardNumber <= 40) {
      return '#4d2600'; // Default dark brown background color
    } else if (cardNumber >= 41 && cardNumber <= 69) {
      return '#ffd700'; // Gold background color
    } else if (cardNumber >= 70 && cardNumber <= 98) {
      return '#add8e6'; // Diamond light blue background color
    } else if (cardNumber >= 99 && cardNumber <= 100) {
      return '#dc143c'; // Crimson red background color
    } else {
      return '#4d2600'; // Default dark brown background color
    }
  };

  const fantasyNames = [
    'Ellie', 'Jack', 'Shanwan', 'Aldric', 'Seraphina', 'Zephyr', 'Luna', 'Cyrus', 'Elysia', 'Thorne',
    'Faelan', 'Isolde', 'Ragnar', 'Lyra', 'Oberon', 'Aria', 'Eirik', 'Elara', 'Varian', 'Maeve',
    'Cassius', 'Calista', 'Orrin', 'Rhiannon', 'Kieran', 'Naida', 'Eirlys', 'Alden', 'Mab', 'Ailis',
    'Eirlys', 'Eldric', 'Sylas', 'Iseult', 'Galen', 'Thalassa', 'Ondine', 'Eirian', 'Oisin', 'Aislinn',
    'Eirian', 'Deryn', 'Morrigan', 'Cian', 'Nerys', 'Orin', 'Rhoswen', 'Eirwen', 'Branwen', 'Einion',
    'Blythe', 'Gwilym', 'Ceridwen', 'Rhian', 'Ffion', 'Bran', 'Arawn', 'Celyn', 'Fionnuala', 'Gwern',
    'Eira', 'Taliesin', 'Morrighan', 'Maelon', 'Rhoslyn', 'Fionn', 'Briallen', 'Brynmor', 'Caelum', 'Carys',
    'Lirael', 'Myrddin', 'Tanwen', 'Mabon', 'Morgana', 'Nerys', 'Oisin', 'Peredur', 'Rhiannon', 'Saraid',
    'Seren', 'Taran', 'Gwydion', 'Gwyneth', 'Boudicca', 'Ciaran', 'Eirlys', 'Taryn', 'Enid', 'Niamh',
    'Owain', 'Pryderi', 'Siofra', 'Tegwen', 'Eirian', 'Endelyn', 'Einion', 'Ffion', 'Gwern', 'Ailis'
  ];

  const fantasyRoles = [
    'Sorcerer', 'Necromancer', 'Queen', 'Knight', 'Rogue', 'Wizard', 'Barbarian', 'Enchantress', 'Bard', 'Warlock',
    'Druid', 'Paladin', 'Thief', 'Cleric', 'Sorceress', 'Witch', 'Sellsword', 'Archer', 'Alchemist', 'Artificer',
    'Ranger', 'Monk', 'Berserker', 'Summoner', 'Illusionist', 'Bladesinger', 'Duelist', 'Inquisitor', 'Beastmaster', 'Mystic',
    'Swashbuckler', 'Pirate', 'Assassin', 'Conjurer', 'Battlemage', 'Apothecary', 'Spellblade', 'Arcanist', 'Oracle', 'Soothsayer',
    'Bard', 'Inquisitor', 'Champion', 'Warlord', 'Crusader', 'Sorceress', 'Warlock', 'Archmage', 'Highlander', 'Savant',
    'Diviner', 'Chronomancer', 'Geomancer', 'Necromancer', 'Soulblade', 'Voidwalker', 'Celestial', 'Nethermancer', 'Bloodmage', 'Sage',
    'Psion', 'Nightblade', 'Cavalier', 'Dragoon', 'Fencer', 'Corsair', 'Marauder', 'High Priest', 'Elementalist', 'Lorekeeper', 'Blightcaller',
    'Stormcaller', 'Shadowdancer', 'Firebrand', 'Frostwarden', 'Galewarden', 'Stoneguard', 'Thornwarden', 'Lifewarden', 'Dreamweaver', 'Nightstalker',
    'Dreadlord', 'Doomsayer', 'Infernal', 'Revenant', 'Wraith', 'Specter', 'Lich', 'Banshee', 'Cursed One', 'Shadowmancer',
    'Mystic', 'Spiritwalker', 'Warden', 'Totemist', 'Skyshaper', 'Earthshaker', 'Starweaver', 'Seer', 'Mentalist', 'Dreamwalker'
  ];

  const getRandomFantasyName = () => {
    return fantasyNames[Math.floor(Math.random() * fantasyNames.length)];
  };

  const getRandomFantasyRole = () => {
    return fantasyRoles[Math.floor(Math.random() * fantasyRoles.length)];
  };

  const handleSellAll = () => {
    if (cards.length === 0) {
      alert('You have no cards to sell!');
      return;
    }

    // Play sell sound
    playSellSound();

    // Set the sellingAll state to trigger the animation
    setSellingAll(true);

    // After a delay, trigger the actual selling process
    setTimeout(() => {
      setSellingAll(false);
      onSellAll();
    }, 1000); // Adjust the delay as needed
  };

  const handleSortByValue = () => {
    setSortByValue(!sortByValue);
  };

  const sortedCards = [...cards].sort((a, b) => sortByValue ? b.value - a.value : a.number - b.number);

  const handleGoToBattle = () => {
    if (cards.length < 10) {
      // Play error sound
      const errorAudio = new Audio('/error.mp3');
      errorAudio.play();

      // Show alert message
      alert("You must COLLECT 10 CARDS before entering the Battle Arena!");
    } else {
      // Play click sound
      playClickSound();
      onGoToBattle();
    }
  };


  return (
    <div className="collection-page">
      {/* Navbar */}
      <div className="navbar">
        <button onClick={() => { onGoToShop(); playClickSound(); }} className="navbar-button clickable">
          WILLYS SHOP
        </button>
        <button onClick={handleGoToBattle}>BATTLE</button> {/* Update Battle button */}

        <button onClick={() => { onGoToMarket(); playClickSound(); }} className="navbar-button clickable">
          TRADE
        </button>
        <button className="navbar-button clickable">BUY PIX</button>
      </div>  

      <h1>Your Collection</h1>
      <h1>₱{formattedPixCount}</h1>
      <h2>Total Card Value: ₱{formattedTotalCardValue}</h2>

      <div className="button-container">
        <button onClick={handleSellAll} className="sell-all-button">
          Sell All Cards
        </button>
        <button onClick={handleSortByValue} className="sort-by-value-button">
          Sort By Value
        </button>
      </div>

      {sortedCards.length === 0 ? (
        <p>You don't have any cards yet. Visit the shop to get some!</p>
      ) : (
        <div className={`card-container${sellingAll ? ' selling-all' : ''}`}>
          {sortedCards.map((card) => (
            <div
              key={card.number}
              className="collection-card"
              onMouseOver={playMouseOverSound}
              style={{ backgroundColor: getCardBackgroundColor(card.number) }}
            >
              <img src={`./cards/${card.number}.png`} alt={`Card ${card.number}`} />
              <p>{getRandomFantasyName()} the {getRandomFantasyRole()}</p>
              <p>Card Value: ₱{card.value}</p>
              <p>Power: {card.number * 6}</p>
              <button onClick={() => onSell(card)}>Sell</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;