import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './User';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  public tokenSubject = new BehaviorSubject<string | null>(null);
  public token :string | null = null;
  public user :User|null = null;

  constructor() {
    this.loadAuthData();
  }

  private loadAuthData() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user_data');

    if (token) {
      this.token = token;
      this.tokenSubject.next(token); // Обновляем токен в BehaviorSubject
    }

    if (userData) {
      this.user = JSON.parse(userData); // Восстанавливаем данные пользователя
    }
  }

  public signin(payload: {email: string, password: string}){
    return  this.http.post<UserAuth>('/userService/api/auth/login', payload)
  }

  public signup(payload: {email: string, password: string, username: string}) {
    return this.http.post<UserAuth>('/userService/api/auth/signup', payload);
  }

  public logout() {
    console.log('logged out');
    localStorage.removeItem("query");
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.token = null;
    this.user = null;
    this.http.post('/userService/api/auth/logout', {}, { withCredentials: true } ).subscribe(
      () => {

      }
    );
  }

  public refreshToken() {
    return this.http.post<UserAuth>('/userService/api/auth/refresh', {})
  }


}
