import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Card, Draw } from "./../models/card";

const url = environment.cdUrl;

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  // we need to append Headers to all requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  public draw(deckId: string, count: number): Observable<Draw> {

    return this.http.get<Draw>(`${environment.cdUrl}${deckId}/draw/?count=${count}`)
  }

  public drawNew(): Observable<Draw> {

    return this.http.get<Draw>(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
  }


  // returns the max sum (aces are treated as 11 unless it would cause the player to bust)
  public sum(cards: Card[]): number {

    let sum = 0;
    let aces = 0;

    cards.forEach((card) => {

      if (card.value == "JACK" || card.value == "QUEEN" || card.value == "KING") {
        sum += 10;
      } else if (card.value == "ACE") {
        aces++;
      } else {
        // + operator to parse the number from a string
        sum += +card.value;
      }
    })

    while (aces > 0) {
      if (sum < 11) {
        sum += 11;
        aces--;
      } else {
        sum += 1;
        aces--;
      }
    }

    console.log(sum)
    return sum;

  }

  public getWarCardValue(card: Card): number {
    if (card.value == "JACK") {return 11} 
    else if (card.value == "QUEEN") {return 12} 
    else if (card.value == "KING") {return 13} 
    else if (card.value == "ACE") {return 14}
    else {
      let returnNumber = parseInt(card.value, 10)
      return returnNumber
    }
  }

}
