// // Initial setup
// const suits = ['♥️', '♦️', '♣️', '♠️'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// // Create a deck of cards
// function createDeck() {
//   // createDeck: CreateDeck of Cards
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }

// // Shuffle the deck
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
//   return deck;
// }

// // Initialize game variables
// let deck = shuffleDeck(createDeck());
// let playerHand = [];
// let dealerHand = []; // dealCard: แจกไพ่ให้กับผู้เล่นหรือเจ้ามือ
// const playerScoreElem = document.getElementById('player-score');
// const dealerScoreElem = document.getElementById('dealer-score');
// const playerCardsElem = document.getElementById('player-cards');
// const dealerCardsElem = document.getElementById('dealer-cards');
// const resultElem = document.getElementById('result');

// // Deal cards
// function dealCard(hand) {
//   return hand.push(deck.pop());
// }

// // Calculate score
// function calculateScore(hand) {
//   let score = 0;
//   let aceCount = 0;

//   for (const card of hand) {
//     if (card.value === 'A') {
//       aceCount++;
//       score += 11;
//     } else if (['K', 'Q', 'J'].includes(card.value)) {
//       score += 10;
//     } else {
//       score += parseInt(card.value);
//     }
//   }

//   while (score > 21 && aceCount > 0) {
//     score -= 10;
//     aceCount--;
//   }

//   return score;
// }

// // Render cards
// function renderCards(hand, element) {
//   element.innerHTML = '';
//   for (const card of hand) {
//     element.innerHTML += `${card.value} of ${card.suit}<br>`;
//   }
// }

// // Start game
// function startGame() {
//   deck = shuffleDeck(createDeck());
//   playerHand = [];
//   dealerHand = [];

//   dealCard(playerHand);
//   dealCard(playerHand);
//   dealCard(dealerHand);
//   dealCard(dealerHand);

//   renderCards(playerHand, playerCardsElem);
//   renderCards(dealerHand, dealerCardsElem);

//   playerScoreElem.textContent = `Score: ${calculateScore(playerHand)}`;
//   dealerScoreElem.textContent = `Score: ${calculateScore(dealerHand)}`;
// }

// // Handle button events
// document.getElementById('hit-btn').addEventListener('click', () => {
//   dealCard(playerHand);
//   renderCards(playerHand, playerCardsElem);
//   playerScoreElem.textContent = `Score: ${calculateScore(playerHand)}`;
//   if (calculateScore(playerHand) > 21) {
//     resultElem.textContent = 'Player Busts! Dealer Wins.';
//   }
// });

// document.getElementById('stand-btn').addEventListener('click', () => {
//   while (calculateScore(dealerHand) < 17) {
//     dealCard(dealerHand);
//   }
//   renderCards(dealerHand, dealerCardsElem);
//   dealerScoreElem.textContent = `Score: ${calculateScore(dealerHand)}`;

//   const playerScore = calculateScore(playerHand);
//   const dealerScore = calculateScore(dealerHand);

//   if (dealerScore > 21) {
//     resultElem.textContent = 'Dealer Busts! Player Wins.';
//   } else if (playerScore > 21) {
//     resultElem.textContent = 'Player Busts! Dealer Wins.';
//   } else if (playerScore > dealerScore) {
//     resultElem.textContent = 'Player Wins!';
//   } else if (playerScore < dealerScore) {
//     resultElem.textContent = 'Dealer Wins!';
//   } else {
//     resultElem.textContent = "It's a Tie!";
//   }
// });

// // Start the game on page load
// startGame();

let cards = [];

let sum = 0;

let hasBlackjack = false;

let isAlive = false;

let message = '';

let messageEl = document.getElementById('message-el');

let sumEl = document.getElementById('sum-el');

let cardsEl = document.getElementById('cards-el');

let startEl = document.getElementById('start');

let newEl = document.getElementById('new');

let playerName = 'Player';

let playerChip = Math.floor(Math.random() * 51);

let playerEl = document.getElementById('player-el');

playerEl.textContent = `${playerName}: $${playerChip}`;

function getRandomCard() {
  let randomNumbers = Math.floor(Math.random() * 13) + 1;
  if (randomNumbers > 10) {
    return 10;
  } else if (randomNumbers === 1) {
    return 11;
  } else {
    return randomNumbers;
  }
}

startEl.addEventListener('click', () => {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
  document.querySelector('#start').style.display = 'none';
});

const resetGame = () => {
  cards = [];
  sum = 0;
  hasBlackjack = false;
  isAlive = false;
  message = '';
  renderGame();
  document.querySelector('#start').style.display = 'flex';
};

const renderGame = () => {
  cardsEl.textContent = `Cards: `;
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]} `;
    if (i < cards.length - 1) {
      cardsEl.textContent += '+ ';
    }
  }
  sumEl.textContent = `Sum: ${sum}`;
  if (sum < 21) {
    message = 'Do you want to draw a new card?';
    isAlive = true;
  } else if (sum === 21) {
    message = "Whoo! You've got BlackJack!";
    hasBlackjack = true;
    isAlive = true;
    setTimeout(() => {
      if (confirm('Play Again?')) {
        resetGame();
      }
    }, 1000);
  } else {
    message = "You're out of the Game!";
    isAlive = false;
    setTimeout(() => {
      if (confirm('Play Again?')) {
        resetGame();
      }
    }, 1000);
  }
  messageEl.textContent = message;
};

newEl.addEventListener('click', () => {
  if (isAlive === true && hasBlackjack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
});
