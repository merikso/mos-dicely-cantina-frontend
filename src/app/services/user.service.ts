import { environment } from './../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserWithId } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private activeUser?: UserWithId;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.cdUrl + '/users/findAll');
  }
  
  getById(id: number): Observable<User> {
    return this.http.get<User>(environment.cdUrl + `/users/${id}`);
  }
  
  invalidateCurrentUser(): void {
    this.activeUser = undefined;
  }
}

