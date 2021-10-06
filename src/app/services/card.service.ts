import { cdUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Card } from "./../models/card";

const url = cdUrl;

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  // we need to append Headers to all requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  public draw(deckId: string, count: number): Observable<Card[]> {

    return this.http.get<Card[]>(`${cdUrl}${deckId}/draw/?count=${count}`)
  }

}
