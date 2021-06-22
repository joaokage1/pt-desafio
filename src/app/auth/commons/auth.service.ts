import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
    private cookieStorage: CookieService,
    private toastr: ToastrService) { }

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
      return this.httpClient.post<LoginResponse>('http://joaostz.pythonanywhere.com/login',
        loginRequestPayload).pipe(map(data => {
          this.cookieStorage.put('authenticationToken', data.access_token);
          this.cookieStorage.put('username', data.nome);
          this.cookieStorage.put('usuario_id', String(data.usuario_id));
  
          this.loggedIn.emit(true);
          this.username.emit(data.nome);
          return true;
        }));
    }

    logout() {
      this.httpClient.post('http://joaostz.pythonanywhere.com/logout', { responseType: 'text' }, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken'))})
        .subscribe(data => {
          this.loggedIn.emit(false);
          this.toastr.success('Deslogado', 'Até mais, volte logo', {
            timeOut: 4000,
          });
        }, error => {
          throwError(error);
        })
      this.cookieStorage.remove('authenticationToken');
      this.cookieStorage.remove('username');
      this.cookieStorage.remove('usuario_id');
      this.cookieStorage.remove('endereco_id');
    }

    deletar(id: number) {
      this.httpClient.delete('http://joaostz.pythonanywhere.com/usuarios/' + id, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken')), responseType: 'text'})
        .subscribe(data => {
          this.loggedIn.emit(false);
          this.toastr.success('Deslogado', 'Até mais, volte logo', {
            timeOut: 4000,
          });
        }, error => {
          this.loggedIn.emit(false);
          this.toastr.success('Deslogado', 'Até mais, volte logo', {
            timeOut: 4000,
          });
        });
      this.cookieStorage.remove('authenticationToken');
      this.cookieStorage.remove('username');
      this.cookieStorage.remove('usuario_id');
      this.cookieStorage.remove('endereco_id');
    }

    getJwtToken() {
      return this.cookieStorage.get('authenticationToken');
    }

    getUserName() {
      return this.cookieStorage.get('username');
    }
  
    isLoggedIn(): boolean {
      return this.getJwtToken() != null;
    }
}
