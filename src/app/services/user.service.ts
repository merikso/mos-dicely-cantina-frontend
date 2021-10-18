import { UserArray } from './../models/user';
import { environment } from './../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { localUrl, awsUrl } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

const url = awsUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly TOKEN_NAME = 'Mos Dicely Token'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  
  
  // public loginUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${url}/user/login`, user, this.httpOptions);
  // }

  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/authenticate`, user, { responseType: 'text' as 'json', headers: { skip: "true" } })  // url, user, this.httpOptions

      .pipe( // we are calling a method on the data returned in the observable
        tap((response: any) => {
          localStorage.setItem(this.TOKEN_NAME, response);
        }),
        catchError(this.handleError) // passing a callback
      )
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${url}/users`);
  }
  
  // not working yet
  withdraw(id: number, amt: number) {
    console.log("withdraw triggered")
    this.http.post(`${url}/users/account/${id}/withdraw/${amt}`, "")
    .subscribe()
  }

  deposit(id: number, amt: number) {
    console.log("deposit triggered")
    this.http.post(`${url}/users/account/${id}/deposit/${amt}`, "")
    .subscribe()
  }
  
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization' }).set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJVc2VyIFRva2VuIFBvcnRhbCIsInN1YiI6InRoaW5oIiwiaXNzIjoiQ3JlYXRlZCBieSBoaWVyb3BoYW50IiwiZXhwIjoxNjM0MDE1OTczLCJpYXQiOjE2MzM5ODcxNzN9.BbPyHNHRQVRepskfADugJlZU3cTY83rfZAsH4dbP7TBiEGTRL9vTqXQHzMx2A9WY2lUXCO0PGyYDB1w-KKWtcw"); 

  getUserFromArray(username: string, uarray: UserArray): number {
    let num = 0
    
    for (let i = 0; i < uarray.users.length; i++) {
      if (uarray.users[i].username == username) {
        num = uarray.users[i].id;
      }
    }

    return num
  }

  public getToken() {
    console.log('getToken() was called')
    return (`Bearer ${localStorage.getItem(this.TOKEN_NAME)}`);
  }

  public welcomeUser(token: string) {
    let tokenStr = `Bearer ${token}`;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(`${url}/home`);
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user, this.httpOptions).pipe(catchError(this.handleError))
  }

  public findAllUsers(): Observable<any> {
    console.log("findAll triggered")
    return this.http.get<any>(`${url}/users/findAll`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public findUserId(username: string, uarr: User[]): number {
    let num = 0;
    for (let i = 0; i < uarr.length; i++) {
      if (uarr[i].username == username) {
        num = uarr[i].id
      }
    }
    return num
  }

  public findByUserId(id: number): Observable<User> {

    return this.http.get<User>(`${url}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  public findByUsername(username: string): Observable<User> {

    return this.http.get<User>(`${url}/users/${username}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(httpError: HttpErrorResponse) {
    if (httpError instanceof ErrorEvent) {
      console.log('And error occurred: ', httpError);
    }
    else {
      console.error(`
        Backend returned code ${httpError.status},
        body was: ${httpError.error}
      `)
    }
    return throwError('Something bad happened; please try again later');
  }
}

