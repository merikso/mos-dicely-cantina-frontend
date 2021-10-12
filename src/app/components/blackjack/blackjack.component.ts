import { DeckService } from './../../services/deck.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from './../../services/card.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

  deck_id = ""
  remaining = -1;
  public playerCards: Card[] = [];
  public dealerCards: Card[] = [];
  pSum = 0;
  dSum = 0;
  
  constructor(private cardService: CardService, private deckService: DeckService) { }

  public newDeck() {
    this.deckService.newDeck()
      .subscribe(data => { this.deck_id = data.deck_id, this.remaining = data.remaining})
  }

  public newHands() {
    this.cardService.draw(this.deck_id, 2)
      .subscribe(data => { this.dealerCards = data.cards, this.remaining= data.remaining })
    this.cardService.draw(this.deck_id, 2)
      .subscribe(data => { this.playerCards = data.cards, this.remaining= data.remaining })
    this.pSum = this.cardService.sum(this.playerCards);
    this.dSum = this.cardService.sum(this.dealerCards);
  }

  public hit() {
    this.cardService.draw(this.deck_id, 1)
      .subscribe(data => this.playerCards.push(data.cards[0]))
    this.pSum = this.cardService.sum(this.playerCards)
  }

  public playerSum() {
    this.pSum = this.cardService.sum(this.playerCards)
  }

  public dealerSum() {
    this.dSum = this.cardService.sum(this.dealerCards)
  }

  ngOnInit(): void {
  }



}
