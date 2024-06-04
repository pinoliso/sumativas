document.addEventListener('DOMContentLoaded', function() {

    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    let dealerHand = [];
    let playerHand = [];
    let deck = [];

    function createDeck() {
        deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function getCardValue(card) {
        if (card.value === 'A') return 11;
        if (['K', 'Q', 'J'].includes(card.value)) return 10;
        return parseInt(card.value);
    }

    function calculateScore(hand) {
        let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
        let aceCount = hand.filter(card => card.value === 'A').length;

        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }

        return score;
    }

    function updateScores() {
        document.getElementById('dealer-score').innerText = `Puntuación: ${calculateScore(dealerHand)}`;
        document.getElementById('player-score').innerText = `Puntuación: ${calculateScore(playerHand)}`;
    }

    function dealInitialCards() {
        playerHand.push(deck.pop(), deck.pop());
        dealerHand.push(deck.pop(), deck.pop());
        updateScores();
        renderHands();
    }

    function renderHands() {
        const dealerCardsContainer = document.getElementById('dealer-cards');
        const playerCardsContainer = document.getElementById('player-cards');

        dealerCardsContainer.innerHTML = '';
        playerCardsContainer.innerHTML = '';

        dealerHand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerText = `${card.value} of ${card.suit}`;
            dealerCardsContainer.appendChild(cardDiv);
        });

        playerHand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerText = `${card.value} of ${card.suit}`;
            playerCardsContainer.appendChild(cardDiv);
        });
    }

    function hit() {
        playerHand.push(deck.pop());
        updateScores();
        renderHands();

        if (calculateScore(playerHand) > 21) {
            endGame('¡Te has pasado! El crupier gana.');
        }
    }

    function stand() {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(deck.pop());
        }
        updateScores();
        renderHands();

        const dealerScore = calculateScore(dealerHand);
        const playerScore = calculateScore(playerHand);

        if (dealerScore > 21) {
            endGame('¡El crupier se ha pasado! Tú ganas.');
        } else if (dealerScore > playerScore) {
            endGame('El crupier gana.');
        } else if (dealerScore < playerScore) {
            endGame('Tú ganas.');
        } else {
            endGame('Empate.');
        }
    }

    function endGame(message) {
        document.getElementById('message').innerText = message;
        document.getElementById('hit').disabled = true;
        document.getElementById('stand').disabled = true;
    }

    function startGame() {
        createDeck();
        shuffleDeck();
        dealerHand = [];
        playerHand = [];
        document.getElementById('hit').disabled = false;
        document.getElementById('stand').disabled = false;
        document.getElementById('message').innerText = '';
        dealInitialCards();
    }

    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stand').addEventListener('click', stand);
    window.onload = startGame;

})