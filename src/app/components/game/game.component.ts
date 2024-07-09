import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  suit: string;
  value: string;
  score: number;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent {

  deck: Card[] = [];
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  playerScore: number = 0;
  dealerScore: number = 0;
  gameOver: boolean = false;
  message: string = '';

  suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.deck = this.createDeck();
    this.shuffleDeck();
    this.playerHand = [];
    this.dealerHand = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameOver = false;
    this.message = '';

    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);

    this.calculateScores();
  }

  createDeck(): Card[] {
    const deck: Card[] = [];
    for (let suit of this.suits) {
      for (let value of this.values) {
        let score = parseInt(value);
        if (value === 'J' || value === 'Q' || value === 'K') {
          score = 10;
        } else if (value === 'A') {
          score = 11;
        }
        deck.push({ suit, value, score });
      }
    }
    return deck;
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCard(hand: Card[]) {
    const card = this.deck.pop();
    if (card) {
      hand.push(card);
    }
  }

  calculateScores() {
    this.playerScore = this.calculateHandScore(this.playerHand);
    this.dealerScore = this.calculateHandScore(this.dealerHand);

    if (this.playerScore > 21) {
      this.gameOver = true;
      this.message = 'Player busts! Dealer wins.';
    } else if (this.dealerScore > 21) {
      this.gameOver = true;
      this.message = 'Dealer busts! Player wins.';
    } else if (this.playerScore === 21 && this.dealerScore === 21) {
      this.gameOver = true;
      this.message = 'It\'s a tie!';
    } else if (this.playerScore === 21) {
      this.gameOver = true;
      this.message = 'Player wins with Blackjack!';
    } else if (this.dealerScore === 21) {
      this.gameOver = true;
      this.message = 'Dealer wins with Blackjack!';
    }
  }

  calculateHandScore(hand: Card[]): number {
    let score = hand.reduce((acc, card) => acc + card.score, 0);
    let aces = hand.filter(card => card.value === 'A').length;

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  }

  playerHit() {
    if (!this.gameOver) {
      this.dealCard(this.playerHand);
      this.calculateScores();
    }
  }

  playerStand() {
    if (!this.gameOver) {
      while (this.dealerScore < 17) {
        this.dealCard(this.dealerHand);
        this.calculateScores();
      }
      this.gameOver = true;
      if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
        this.message = 'Player wins!';
      } else if (this.playerScore < this.dealerScore) {
        this.message = 'Dealer wins!';
      } else {
        this.message = 'It\'s a tie!';
      }
    }
  }

}
