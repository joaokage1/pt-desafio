import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { }

    logout() {
      this.httpClient.post('', { responseType: 'text' })
        .subscribe(data => {
          console.log(data);
        }, error => {
          throwError(error);
        })
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('expiresAt');
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
