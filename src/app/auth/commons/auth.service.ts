import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { }

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
      return this.httpClient.post<LoginResponse>('http://joaostz.pythonanywhere.com/login',
        loginRequestPayload).pipe(map(data => {
          this.localStorage.store('authenticationToken', data.access_token);
          this.localStorage.store('username', data.nome);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('usuario_id', data.usuario_id);
  
          this.loggedIn.emit(true);
          this.username.emit(data.nome);
          return true;
        }));
    }

    logout() {
      this.httpClient.post('http://joaostz.pythonanywhere.com/logout', { responseType: 'text' }, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.localStorage.retrieve('authenticationToken'))})
        .subscribe(data => {
          this.loggedIn.emit(false);
          console.log(data);
        }, error => {
          throwError(error);
        })
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('expiresAt');
      this.localStorage.clear('usuario_id');
    }

    getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
    }

    getUserName() {
      return this.localStorage.retrieve('username');
    }
  
    isLoggedIn(): boolean {
      return this.getJwtToken() != null;
    }
}
