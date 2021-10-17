import { environment } from './../../environments/environment.prod';
import { Draw, Card } from './../models/card';
import { CardService } from './card.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Deck, DeckPile } from "./../models/deck";


const url = environment.cdUrl;

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  deck_id = ''

  constructor(private http: HttpClient, private cardService : CardService) { }

  // we need to append Headers to all requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public newDeck(): Observable<Deck> {

     return this.http.get<Deck>(`${environment.cdUrl}new/shuffle/?deck_count=1`)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  public addPile(deck_id: string, pileName: string, cards: string): Observable<DeckPile> {
    return this.http.get<DeckPile>(`${environment.cdUrl}${deck_id}/pile/${pileName}/add/?cards=${cards}`)
  }

  private handleError(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {

      console.log('An error occured: ', httpError.error.message)
    } else {


      console.error(`
      
        Backend returned code ${httpError.status}, 
        body was: ${httpError.error}
      `)
    }
    return throwError('Something bad happened; please try again later')
  }

}
