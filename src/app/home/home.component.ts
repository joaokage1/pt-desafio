import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/commons/auth.service';
import { EnderecoService } from '../services/endereco/endereco.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string = "";
  pais: string = "";
  estado: string = "";
  cidade: string = "";
  rua: string = "";
  numero: number = -1;
  cep: number = -1;
  complemento: string = "";
  
  
  constructor(private router:Router
    , private authService: AuthService
    , private usuarioService: UsuarioService
    , private cookieStorage: CookieService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

    
    if (this.isLoggedIn){
      this.buscarUsuario()
    }
  }

  buscarUsuario(){
    this.usuarioService.buscar(Number(this.cookieStorage.get('usuario_id'))).subscribe(data => {
      if (data.usuario && data.usuario.endereco){
        this.pais = data.usuario.endereco.pais;
        this.cidade = data.usuario.endereco.municipio;
        this.estado = data.usuario.endereco.estado;
        this.rua = data.usuario.endereco.rua;
        this.numero = data.usuario.endereco.numero;
        this.cep = data.usuario.endereco.cep;
        this.complemento = data.usuario.endereco.complemento;
      }
    }, error => {
      throwError(error)
    });
  }


}
