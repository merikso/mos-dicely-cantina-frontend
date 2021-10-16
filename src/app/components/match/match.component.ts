import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  deck_id = "";
  remaining = 52;
  public playerCards: Card[] = [];

  constructor(private cardService: CardService, private deckService: DeckService) {
    //Create the new Deck
    this.newDeck();

  }

  public newDeck() {
    this.deckService.newDeck()
      .subscribe(data => { this.deck_id = data.deck_id, this.remaining = data.remaining })
  }

  public layCards() {
    this.cardService.draw(this.deck_id, 52)
      .subscribe(data => { this.playerCards = data.cards, this.remaining = data.remaining })
  }

  ngOnInit(): void {
    this.newDeck();
    this.layCards();
  }

}
