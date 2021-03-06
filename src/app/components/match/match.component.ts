import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: ''
      })),
      state('undefined', style({
        transform: ''
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('* => flipped', [
        animate('400ms')
      ]),
      transition('undefined => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ])
    ])
  ]
})
export class MatchComponent implements OnInit {

  deck_id = "";
  remaining = 52;
  matchedCount = 0;
  match_started = false;
  public playerCards: Card[] = [];
  public flippedCards: Card[] = [];
  

  constructor(private cardService: CardService, private deckService: DeckService) {
    //Create the new Deck
    console.log("Deck length: " + this.playerCards.length);
  }

    flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  public newDeck() {
    this.deckService.newDeck()
      .subscribe(data => { this.deck_id = data.deck_id, this.remaining = data.remaining })
      console.log("Deck length: " + this.playerCards.length);
  }

  public layCards() {
    this.match_started = true;
    console.log("Deck length: " + this.playerCards.length);
    this.cardService.draw(this.deck_id, 52)
      .subscribe(data => { this.playerCards = data.cards, this.remaining = data.remaining })
    console.log("Laying cards out.");
    console.log("Deck length: " + this.playerCards.length);
    for(let i=0; i<52; i++){
      this.playerCards[i] = new Card('','','','') //use i instead of 0
      this.playerCards[i].state = 'default'
    }
    
  }

  cardClicked(index: number): void {
    const cardInfo = this.playerCards[index];
    cardInfo.state = 'default';
    console.log(cardInfo.value + " clicked.");
    console.log("in " + cardInfo.state + " state.");
    console.log("Deck length: " + this.playerCards.length);

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.value === cardTwo.value ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;
        cardOne.image="blank_space.png";
        cardTwo.image="blank_space.png";

        if (this.matchedCount === 26) {
          //Show the victory button
          this.match_started = false;
          this.restart();
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.remaining = 52;
    this.newDeck();
    this.layCards();
  }

  ngOnInit(): void {
    this.newDeck();
  }

}
