import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { cdUrl } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Deck } from "./../models/deck";

const url = cdUrl;

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }

  // we need to append Headers to all requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public newDeck(): Observable<Deck> {

     return this.http.get<Deck>(`${cdUrl}new/shuffle/?deck_count=1`)
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
  }

}
