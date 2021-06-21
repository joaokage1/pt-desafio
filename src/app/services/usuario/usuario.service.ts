import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioRequest } from './models/usuario.request';
import { UsuarioResponse } from './models/usuario.response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient, private localstorage: LocalStorageService, private cookieStorage: CookieService) { }

  buscar(id: number): Observable<UsuarioResponse> {
    return this.httpClient.get<UsuarioResponse>('http://joaostz.pythonanywhere.com/usuarios/' + id, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken'))}).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return data;
      }
      return data;
      }));
  }

  cadastrar(usuarioRequest: UsuarioRequest): Observable<UsuarioResponse> {
    return this.httpClient.post<UsuarioResponse>('http://joaostz.pythonanywhere.com/cadastro',
    usuarioRequest).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return data;
      }
      return data;
      }));
  }
}
