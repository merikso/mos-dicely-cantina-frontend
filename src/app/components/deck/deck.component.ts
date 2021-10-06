import { DeckService } from './../../services/deck.service';
import { Deck } from './../../models/deck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  title = "Deck"
  deck = new Deck(false, "", false, 0)

  constructor(private deckService: DeckService) { }

  public newDeck() {

    this.deckService.newDeck()
      .subscribe(data => this.deck = data)
  }

  ngOnInit(): void {
  }

}
