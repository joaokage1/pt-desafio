import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioResponse } from './models/usuario.response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient, private cookieStorage: CookieService) { }

  buscar(id: number): Observable<UsuarioResponse> {
    return this.httpClient.get<UsuarioResponse>('http://joaostz.pythonanywhere.com/usuarios/' + id, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken'))}).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return data;
      }
      return data;
      }));
  }
}
