import { DeckService } from './../../services/deck.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from './../../services/card.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

  deck_id = ""
  remaining = -1;
  inProgress = false;
  playing = false;
  blackjack = false;
  win = 0; // dummy value 
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
    .add(() => { this.pSum = this.cardService.sum(this.playerCards),
      this.dSum = this.cardService.sum(this.dealerCards),
      this.inProgress = true
      this.playing = true
      this.blackjack = false
      this.win = -5; 
      if (this.pSum == 21) {
      this.blackjack = true;
      this.inProgress = false;
      this.playing = false;
    }});
  }

  public hit() {
    this.cardService.draw(this.deck_id, 1)
      .subscribe(data => this.playerCards.push(data.cards[0]))
      .add(() => { this.pSum = this.cardService.sum(this.playerCards), 
        this.playing = !this.busted() })
  }

  public dealerHit = new Observable<number>((dummy) => {
    console.log("dealerHit observable")
    this.cardService.draw(this.deck_id, 1)
        .subscribe(data => this.dealerCards.push(data.cards[0]))
        .add(() => { this.dSum = this.cardService.sum(this.dealerCards)
          console.log(this.dSum)})
    return dummy;
  });


    public dealerHit1() {
      setTimeout(() => {
      console.log("In the dealerHit function")
      this.cardService.draw(this.deck_id, 1)
        .subscribe(data => this.dealerCards.push(data.cards[0]))
        .add(() =>  this.dSum = this.cardService.sum(this.dealerCards))
        console.log("dealerHit function finished")
      }, 0)
    }
  

  public playerSum() {
    this.pSum = this.cardService.sum(this.playerCards)
  }

  public dealerSum = new Observable<number>((res) => {
   console.log("in the dealerSum promise")  
    res.next(this.cardService.sum(this.dealerCards))
  });

  public stand() {
    this.playing = false;
    this.dealerLogic()
  }

  public busted() {
    if (this.pSum > 21) {
      this.playing = false;
      this.inProgress = false
      this.win = -1;
      return true;
    } else {
      return false;
    }
  }

  public gameState() {
    setTimeout(() => {
    if (!this.inProgress) {
      if (this.dSum > 21) {
        this.win = 1
      } else if (this.pSum > this.dSum) {
        this.win = 1
      } else if (this.dSum > this.pSum) {
        this.win = -1
      } else if (this.pSum == this.dSum) {
        this.win = 0;
      }
    }
    }, 2000)
  }

  public dealerLogic() {
    setTimeout(() => {
    console.log("Dealer logic executing")
    if (this.pSum < 22 && !this.playing) {
      if (this.dSum < 17) {
      console.log("before dealer hit")
      this.dealerHit1()
      console.log(this.dSum)
      console.log(this.dealerCards.length)
      }
      if (this.dSum < 17) {
        this.dealerLogic()
      }
      this.inProgress = false;
      this.gameState();
    }
  }, 500)
  }

  ngOnInit(): void {
  }

}
