import { CardService } from './../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  title = "Card"
  deck_id = "";
  card = new Card("", "", "", "")
  public cards: Card[] = [];

  constructor(private cardService: CardService) { }

  public drawCards(count: number) {
    this.cardService.draw(this.deck_id, count)
      .subscribe(data => this.cards = data.cards)
  }

  public drawNewCard() {
    this.cardService.drawNew()
      .subscribe(data => this.cards = data.cards)
  }

  ngOnInit(): void {
  }

}
