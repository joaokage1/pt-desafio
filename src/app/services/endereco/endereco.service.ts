import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnderecoRequestPayload } from './endereco.request';
import { EnderecoResponsePayload } from './endereco.response';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private httpClient: HttpClient, private localstorage: LocalStorageService, private cookieStorage: CookieService) { }

  cadastrar(enderecoRequest: EnderecoRequestPayload): Observable<number> {
    return this.httpClient.post<EnderecoResponsePayload>('http://joaostz.pythonanywhere.com/endereco',
    enderecoRequest).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return -1;
      }
      return data.id;
      }));
  }

  buscar(id: number): Observable<EnderecoResponsePayload> {
    return this.httpClient.get<EnderecoResponsePayload>('http://joaostz.pythonanywhere.com/endereco/' + id, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken'))}).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return data;
      }

      console.log(data)
      return data;
      }));
  }

  atualizar(enderecoRequest: EnderecoRequestPayload,id: number): Observable<EnderecoResponsePayload> {
    return this.httpClient.put<EnderecoResponsePayload>('http://joaostz.pythonanywhere.com/endereco/' + id, enderecoRequest, { headers:new HttpHeaders().append('Authorization', `Bearer ` + this.cookieStorage.get('authenticationToken'))}).pipe(map(data => {
      if (data.message){
        console.log(data.message)
        return data;
      }

      console.log(data)
      return data;
      }));
  }

  
}
