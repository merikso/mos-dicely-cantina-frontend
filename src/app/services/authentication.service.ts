import { awsUrl } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { localUrl } from 'src/environments/environment';

const url = awsUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session
  authenticate(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${url}/authenticate`, { username, password })
      .pipe(
        catchError(this.handleError),
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          console.log(userData);
          console.log(tokenStr);
          let usernames = sessionStorage.getItem("username")
          console.log(usernames)
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
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
