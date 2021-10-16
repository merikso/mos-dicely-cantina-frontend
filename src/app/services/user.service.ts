import { environment } from './../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserWithId } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private activeUser?: UserWithId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.bkndUrlLocal + '/users/findAll');
  }
  
  getById(id: number): Observable<User> {
    return this.http.get<User>(environment.bkndUrlLocal + `/users/${id}`);
  }

  // not working yet
  withdraw(id: number, amt: number) {
    //return this.http.put(`${environment.bkndUrlLocal}account/${id}/withdraw/${amt}`)
  }
  
  invalidateCurrentUser(): void {
    this.activeUser = undefined;
  }
}

