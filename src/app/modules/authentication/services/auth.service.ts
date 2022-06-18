import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.base_url;
  private token: string;
  public tokenSubjectSource = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private router: Router) {
  }

  public saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.tokenSubjectSource.next(token);
    this.token = token;
  }

  public getToken(): string {
    return localStorage.getItem('user-token');
  }

  public saveUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  public getUserRole() {
    return localStorage.getItem('user-role');
  }

  login($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, $userCredentials, {
      observe: 'response',
    });
  }

  verify($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/local/verify`, $userCredentials, {
      observe: 'response',
    });
  }

  public saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public saveUserPermissions(data) {
    localStorage.setItem('permissions', JSON.stringify(data));
  }
  signUp($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/companies`, $userCredentials, {
      observe: 'response',
    });
  }
}
