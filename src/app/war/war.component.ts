import { Card } from '../models/card';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { Component, OnInit } from '@angular/core';




const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}


@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.css']
})

export class WarComponent implements OnInit {
  deck_id = ''
  dealer_remaining = 0
  public playerCards: Card[] = [];
  public dealerCards: Card[] = [];
  stop = true;
  endgame = false;
  inRound = false;
  setup = false;
  innerText = ''
  player_remaining = 0
  pCurrentCard = 'face-down-match.png'
  dCurrentCard = 'face-down-match.png'
  buttonText = 'Start Game'


  constructor(private cardService : CardService, private deckService : DeckService) { }

  ngOnInit(): void { }

  public startGame() {
    console.log('Starting game.')
    this.deckService.newDeck()
    .subscribe(data => { this.deck_id = data.deck_id}).add( ()=> {
    this.inRound = false;
    this.stop = false;
    this.setup = true;
    console.log(`${this.deck_id}`)
    })
   

    // Should I do this?
    // this.newHands();
  }

  public newHands() {
    console.log('Distributing cards...')
    this.cardService.draw(this.deck_id, 26)
      .subscribe(data => { this.dealerCards = data.cards}).add(() =>{
        this.dealer_remaining = 10
    
      this.cardService.draw(this.deck_id, 26)
        .subscribe(data => { this.playerCards = data.cards }).add(() => {
          this.player_remaining = 10

        this.stop = false
        this.inRound = false

        console.log(this.dealerCards)
        console.log(this.playerCards)

        this.cleanBeforeRound()
      })
    
    })
    
  }

  public centerButton() {
    if (this.stop) {
      this.startGame()
      this.buttonText = 'Get Cards'
    } else if (this.setup) {
      this.newHands()
      this.buttonText = 'Draw Card'
    } else if (this.inRound) {
      this.cleanBeforeRound()
      this.buttonText = 'Draw Card'
    } else {
      this.drawCards()
      this.buttonText = 'Continue'
    }
  }
  /**
   * TO DO
   * 2. Buttons to draw
   * 3. Center button says 'start game' when stop = true; 'draw' when inround = false;
   * 'continue' when inround = true
   * 4. CSS
   * 5. Connect to chips
   */
  public cleanBeforeRound() {
    console.log('Cleaning table...')
    this.inRound = false;
    this.innerText = ''
    this.pCurrentCard = 'face-down-match.png'
    this.dCurrentCard = 'face-down-match.png'
    this.setup = false
    // METHODS
    
    this.updateDeckCount()
  }

  public testValue() {
    
    console.log(this.playerCards)
  }

  public drawCards() {
    console.log('Drawing cards...')

    this.inRound = true

    const playerCard = this.playerCards.shift()!
    this.pCurrentCard = playerCard.image 

    const dealerCard = this.dealerCards.shift()!
    this.dCurrentCard = dealerCard.image
    console.log(this.dCurrentCard)

    console.log(playerCard.value)
    console.log(dealerCard.value)

    this.updateDeckCount()

    if (this.whoWinsRound(playerCard, dealerCard)) {
      this.innerText = "Win"
      this.playerCards.push(playerCard)
      this.playerCards.push(dealerCard)
    } else if (this.whoWinsRound(dealerCard, playerCard)){
      this.innerText = "Lose"
      this.dealerCards.push(playerCard)
      this.dealerCards.push(dealerCard)
    } else {
      this.innerText = "Draw"
      this.playerCards.push(playerCard)
      this.dealerCards.push(dealerCard)
    }

    if (this.gameOver(this.playerCards.length)) {
      console.log('Game over!')
      this.innerText = "You Lose!"
      this.stop = true 
      this.endgame = true
    } else if (this.gameOver(this.dealerCards.length)) {
      console.log('Game over!')
      this.innerText = "You Win!"
      this.stop = true
      this.endgame = true
    }
  }

  gameOver(number: number): boolean {
    return number === 0
  }

  whoWinsRound(card1: Card, card2: Card): boolean {
    return this.cardService.getWarCardValue(card1) > this.cardService.getWarCardValue(card2)
  }
  
  public updateDeckCount() {
    console.log('Deck count updated.')
    this.player_remaining = this.playerCards.length-16
    this.dealer_remaining = this.dealerCards.length-16
  }

  // public isRoundWinner(card1: Card, card2: Card): string {
  //   // let value1 = this.cardService.getWarCardValue(card1)
  //   // let value2 = this.cardService.getWarCardValue(card2)

  //   // if (value1 > value2) {
  //   //   return "Dealer won."
  //   // } else if (value1 < value2) {
  //   //   return "You won!"
  //   // } else {
  //   //   return "Draw"
  //   // }

  // }

  // public pileCreation() { 
    //   let playercode = ''
    //   this.cardService.draw(this.deck_id, 26).subscribe( data => {this.playerCardsTest = data.cards})
      
    //   console.log(this.playerCardsTest)
    //   let counter = 0
    //   for (let card of this.playerCardsTest) {
    //     let code = card.code
    //     playercode += code
    
        
    //     if (counter < this.playerCardsTest.length-1) {
    //       playercode += ','
    //     }
  
    //     counter += 1
    //   }
  
    //   console.log(`playercodes: ${playercode}`)
  
    //   this.deckService.addPile(this.deck_id, 'players', playercode).subscribe( data => {this.player_remaining = data.remaining, this.playerCards = data.cards})
    //   console.log(this.player_remaining)
    //   console.log(this.playerCards)
    // }
}
