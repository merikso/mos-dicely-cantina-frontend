import { UserService } from 'src/app/services/user.service';
import { Card } from '../models/card';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { Component, OnInit } from '@angular/core';
import { User, UserArray } from '../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




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
  inRound = false;
  setup = false;
  betRequired = true;
  innerText = ''
  player_remaining = 0
  pCurrentCard = 'face_down_match.png'
  dCurrentCard = 'face_down_match.png'
  buttonText = 'Start Game'
  bet = 0
  u_id = 0
  chips = 0
  starterText = 'Enter your bet and submit.'
  victory = ''


  constructor(private cardService : CardService, 
              private deckService : DeckService,
              private userService : UserService,
              private fb: FormBuilder) 
              { }

  ngOnInit(): void {
    this.getUser();
   }

   public submit() {
     if(this.bet <= this.chips && this.bet != 0) {
       console.log("Bet is valid, proceeding...")
       this.getBet()
     } else if (this.bet == 0) {
       console.log("Bet is too low, restarting.")
       this.betRequired = true;
       this.starterText = 'You cannot bet 0 chips! You must bet at least one chip.'
     } else {
       console.log("Bet is too high!")
       this.betRequired = true;
       this.starterText = 'You cannot bet more than your chips. Try again.'
     }
   }

   

  public startGame() {
    console.log('Starting game.')
    this.deckService.newDeck()
    .subscribe(data => { this.deck_id = data.deck_id}).add( ()=> {
    this.inRound = false;
    this.stop = false;
    this.setup = true;
    this.getUser()
    console.log(`${this.deck_id}`)
    })
   

    // Should I do this?
    // this.newHands();
  }

  public newHands() {
    console.log('Distributing cards...')
    this.cardService.draw(this.deck_id, 26)
      .subscribe(data => { this.dealerCards = data.cards}).add(() =>{
        this.dealer_remaining = 2
    
      this.cardService.draw(this.deck_id, 26)
        .subscribe(data => { this.playerCards = data.cards }).add(() => {
          this.player_remaining = 2

        this.stop = false
        this.inRound = false

        console.log(this.dealerCards)
        console.log(this.playerCards)

        this.cleanBeforeRound()
      })
    
    })
    
  }

  public getBet() {
    this.betRequired = false;
    console.log(this.bet)
    this.startGame()
  }

  public centerButton() {
    if (this.setup) {
      this.newHands()
      this.buttonText = 'Draw Card'
    } else if (this.inRound) {
      this.cleanBeforeRound()
      this.buttonText = 'Draw Card'
    } else if (this.stop == false) {
      this.drawCards()
    } else {
      this.betRequired = true;
    }
  }
  
  public cleanBeforeRound() {
    console.log('Cleaning table...')
    this.inRound = false;
    this.innerText = ''
    this.pCurrentCard = 'face_down_match.png'
    this.dCurrentCard = 'face_down_match.png'
    this.setup = false
    // METHODS
    
    this.updateDeckCount()
  }

  public testValue() {
    
    console.log(this.playerCards)
  }

  public drawCards() {
    console.log('Drawing cards...')

    if (this.dealer_remaining == -24) {
      this.betRequired = true;
    }

    this.inRound = true

    const playerCard = this.playerCards.shift()!
    this.pCurrentCard = playerCard.image 

    const dealerCard = this.dealerCards.shift()!
    this.dCurrentCard = dealerCard.image
    console.log(this.dCurrentCard)

    console.log('Player card: ' + playerCard.value)
    console.log('Dealer card: ' + dealerCard.value)

    this.updateDeckCount()

    if (this.whoWinsRound(playerCard, dealerCard)) {
      this.innerText = "Win"
      this.playerCards.push(playerCard)
      this.playerCards.push(dealerCard)
      this.buttonText = 'Continue'
    } else if (this.whoWinsRound(dealerCard, playerCard)){
      this.innerText = "Lose"
      this.dealerCards.push(playerCard)
      this.dealerCards.push(dealerCard)
      this.buttonText = 'Continue'
    } else {
      this.innerText = "Draw"
      this.playerCards.push(playerCard)
      this.dealerCards.push(dealerCard)
      this.buttonText = 'Continue'
    }

    this.updateDeckCount()

    if (this.gameOver(this.player_remaining)) {
      console.log('Game over!')
      this.innerText = `You Lose! You lost ${this.bet} chips.`
      this.inRound = false;
      this.stop = true 
      this.pCurrentCard = 'gameover.gif'
      this.dCurrentCard = 'gameover2.gif'
      // this.pCurrentCard = 'face_down_match.png'
      this.buttonText = 'Play again?'
      this.starterText = 'Enter your bet and submit.'
      this.withdraw()
     
      // this.betRequired = true
    } else if (this.gameOver(this.dealer_remaining)) {
      console.log('Game over!')
      this.innerText = `You Win! You won ${this.bet} chips`
      this.inRound = false;
      this.stop = true
      this.dCurrentCard = 'winnerwinner.gif'
      this.pCurrentCard = 'star-wars-funny-icegif-2.gif'
      // this.dCurrentCard = 'face_down_match.png'
      this.deposit()
      this.buttonText = 'Play again?'
      this.starterText = 'Enter your bet and submit.'
      // this.betRequired = true
    }
  }

  gameOver(number: number): boolean {
    return number === 0
  }

  whoWinsRound(card1: Card, card2: Card): boolean {
    console.log("Card One Value: " + this.cardService.getWarCardValue(card1))
    console.log("Card Two Value: " + this.cardService.getWarCardValue(card2))
    return this.cardService.getWarCardValue(card1) > this.cardService.getWarCardValue(card2)
  }
  
  public updateDeckCount() {
    console.log('Deck count updated.')
    this.player_remaining = this.playerCards.length-24
    this.dealer_remaining = this.dealerCards.length-24
  }

  public getUser() {
    let uarray: UserArray = new UserArray([])
    let uarr: User[] = []
    let string = ""

    this.userService.findAllUsers()
    .subscribe(data => string = JSON.stringify(data))
    .add(() => { uarr = JSON.parse(string), console.log(uarr), 
    this.u_id = this.userService.findUserId(sessionStorage.getItem('username')!, uarr)
    console.log(this.u_id)
    this.getUserById()
  })
  }
  
  public getUserById() {
    this.userService.findByUserId(this.u_id)
      .subscribe(data => { this.u_id = data.id, this.chips = data.chips })
    console.log(this.chips)
  }

  public withdraw() {
    console.log("Before withdrawal: " + this.chips)
    this.userService.withdraw(this.u_id, this.bet);
    console.log("Withdrew " + this.bet + ".")
    console.log("After withdrawal: " + this.chips)
    this.getUser()
    }

  public deposit() {
    console.log("Before deposit: " + this.chips)
    this.userService.deposit(this.u_id, this.bet)
    console.log("Deposited " + this.bet + ".")
    console.log("After deposit: " + this.chips)
    this.getUser()
  }
}

  

