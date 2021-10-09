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
  }

  public hit() {
    this.cardService.draw(this.deck_id, 1)
      .subscribe(data => this.playerCards.push(data.cards[0]))
  }

  ngOnInit(): void {
  }



}
